import React, { PureComponent, Fragment } from 'react';
import { Tag, Icon, Menu, Dropdown } from 'antd';
import Link from 'umi/link';
import {
  getNewTagList,
  setTagNavListInLocalstorage,
  getTagNavListFromLocalstorage,
  routeEqual,
} from '@/utils/utils';
import {Ones_confirm} from '@/components/Ones_Modal';
import {wordsFormat} from '@/utils/publicWord';
import styles from './tags-nav.less';

class TagsNav extends PureComponent {

  state = { 
    tBodyLeft: 0,
    tagsList: getTagNavListFromLocalstorage() || [{name:'Home',path:'/home'}],
  }; 

  componentWillReceiveProps(nextProps) {
    const { breadcrumbNameMap, location:{pathname}} = nextProps;
    const {tagsList} = this.state;
    let newTagsList;
    if(tagsList.findIndex(item => item.path === pathname) < 0 ) {
      const tagsName = pathname in breadcrumbNameMap ? breadcrumbNameMap[pathname].name : false;
      newTagsList = tagsName ? getNewTagList(tagsList,{name:tagsName, path:pathname}) : false;
    } else {
      newTagsList = tagsList.map( (item,index) => {
        if(index > 0) return {name:breadcrumbNameMap[item.path].name, path:item.path};
        else return item
      })
    } 
  
    if(newTagsList)
      this.setState({
        tagsList:[...newTagsList],
      },()=>{
        setTagNavListInLocalstorage([...newTagsList]);
      })
  }

  onHandleScroll (e) {
    const {type} = e;
    let delta = 0
    if (type === 'wheel' || type === 'DOMMouseScroll' || type === 'mousewheel') {
      delta = -(e.deltaY)* 40;
    }
    this.handleScroll(delta)
  }

  handleScroll = offset => {
    const outerWidth = this.scrollOuter.offsetWidth;
    const bodyWidth = this.scrollBody.offsetWidth;
    const {tBodyLeft} = this.state;
    let tagBodyLeft = 0;
    if (offset > 0) {
      tagBodyLeft = Math.min(0, tagBodyLeft + offset)
    } else if (outerWidth < bodyWidth) {
        if (tagBodyLeft < -(bodyWidth - outerWidth)) {
          tagBodyLeft = tBodyLeft;
        } else {
          tagBodyLeft = Math.max(tagBodyLeft + offset, outerWidth - bodyWidth)
        }
    }
    this.setState({
      tBodyLeft:tagBodyLeft,
    })
  }

  handleClose = current => {
    const {tagsList} = this.state;
    const {tagsNextPage, location:{pathname}} = this.props;
    const res = tagsList.filter(item => !routeEqual(current, item))
    const showTagIndex = tagsList.findIndex(item => item.name === current.name);
    this.setState({
      tagsList:[...res],
    },()=>{
      setTagNavListInLocalstorage([...res]);
      if(pathname === current.path) tagsNextPage(res,showTagIndex);
    });
  }

  handleTagsOption = type => {
    const {key} = type;
    const {tagsList} = this.state;
    const {tagsNextPage,location:{pathname}} = this.props;
    Ones_confirm({
      message: key.includes('all')? wordsFormat('dm.text.to.close.all') : wordsFormat('dm.text.to.close.other'),
      callback:()=>{
        let res;
        if (key.includes('all')) {
          res = tagsList.filter(item => item.name === 'Home')
        } else {
          res = tagsList.filter(item => item.path === pathname || item.name === 'Home')
        }
        this.setState({
          tagsList:[...res],
        },()=>{
          setTagNavListInLocalstorage([...res]);
          this.handleScroll();
          tagsNextPage(res);
        });
      },
    })
  }
  
  render() {
    const {tBodyLeft, tagsList} = this.state;
    const {location:{pathname}} = this.props;
    const menu = (
      <Menu onClick={this.handleTagsOption} selectedKeys={[]}>
        <Menu.Item key="close-all">{wordsFormat('dm.text.close.all')}</Menu.Item>
        <Menu.Item key="close-others">{wordsFormat('dm.text.close.other')}</Menu.Item>
      </Menu>
    );
    return (
      <Fragment>
        <div className="tag__nav__wrapper">
          <div className={styles.tags__nav}>
            <div className={styles.close__con}>
              <Dropdown overlay={menu}>
                <Icon type="close-circle" className={styles.close__circle__icon} />
              </Dropdown>
            </div>
            <div className={`${styles.btn__con} ${styles.left__btn}`}>
              <Icon type="left" onClick={this.handleScroll.bind(this,240)} />
            </div>
            <div className={`${styles.btn__con} ${styles.right__btn}`}>
              <Icon type="right" onClick={this.handleScroll.bind(this,-240)} />
            </div>
            <div className={styles.scroll__outer} onWheel={(e) => this.onHandleScroll(e)} ref={el=>this.scrollOuter=el}>
              <div ref={el=>this.scrollBody=el} style={{left: tBodyLeft}} className={styles.scroll__body}>
                {tagsList.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag 
                      key={tag.name} 
                      closable={index !== 0} 
                      onClose={() => this.handleClose(tag)}
                      ref={el=>this.tagsPageOpened=el}
                      color={(pathname === tag.path || tagsList.length === 1 ) ? '#C8102e' : ''}
                      onChange={()=>this.handleScroll()}
                    >
                      <Link to={tag.path}>{tag.name}</Link>
                    </Tag>
                  );
                  return isLongTag ? <Tooltip title={tag.name} key={tag.name}>{tagElem}</Tooltip> : tagElem;
                })}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default TagsNav;