import React, { PureComponent } from 'react';
import router from 'umi/router';
import { Tabs } from 'antd';
import Ones_Home from '@/pages/Ones_Home';
import storage from '@/utils/storage';
import { wordsFormat } from '@/utils/publicWord';
import styles from './page.less';

const { TabPane } = Tabs;
const homePageKey = "/";

class TabPages extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tabList: { [homePageKey]: { closable: false, key: homePageKey, tab: wordsFormat("menu.home"), content: <Ones_Home />, locale: "menu.home" } },
            activeKey: homePageKey,
            stateTabLists: null
        };
    }

    componentWillMount() {
        const {
            location: { pathname }
        } = this.props;
        const { tabList } = this.state;
        const unClosedTabs = storage.session.get("Ones_Tabs") || [];
        const listObj = { ...tabList };
        let txt = "";
        let words = "";
        unClosedTabs.forEach(key => {
            if (key !== homePageKey && words.indexOf("menu") === -1) {
                txt = `menu.${key.replace("/", "")}`;
                words = wordsFormat(txt);
                Object.assign(listObj, { [key]: { closable: true, key, tab: wordsFormat(txt), content: "" } });
            }
        })
        this.setState({
            tabList: listObj,
            activeKey: pathname
        });
    }

    componentWillReceiveProps(nextProps) {
        this.renderTabs(nextProps);
    }

    onChange = key => {
        this.setState({ activeKey: key });
        router.push(key);
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        let { activeKey } = this.state;
        const { tabList } = this.state;
        const tabListObj = { ...tabList };
        const tabKeys = Object.keys(tabList);
        let lastIndex = tabKeys.length - 1;
        let needRouterPush = false;
        delete tabListObj[targetKey];
        lastIndex -= 1;
        if (activeKey === targetKey) {
            activeKey = (tabKeys[lastIndex] === activeKey) ? tabKeys[lastIndex + 1] : tabKeys[lastIndex];
            needRouterPush = true;
        }
        this.setState({
            tabList: tabListObj,
            activeKey
        }, () => {
            storage.session.set("Ones_Tabs", Object.keys(tabListObj));
            needRouterPush && router.push(activeKey);
        });
    }

    updateTreeList = data => {
        const treeData = data;
        const treeList = [];
        const getTreeList = tree => {
            tree.forEach(node => {
                if (!node.level) {
                    Object.assign(treeList, { [node.path]: { tab: node.name, key: node.path, locale: node.locale, closable: true, content: '' } })
                }
                if (!node.hideChildrenInMenu && node.children && node.children.length > 0) {
                    getTreeList(node.children);
                }
            });
        };
        getTreeList(treeData);
        return treeList;
    };

    renderTabs = props => {
        const {
            children,
            location: { pathname },
            menuData,
        } = props;
        const { tabList, stateTabLists } = this.state;
        const tabLists = stateTabLists || this.updateTreeList(menuData);
        const listObj = { ...tabList };
        if (!Object.keys(listObj).includes(pathname)) {
            tabLists[pathname].content = children;
            Object.assign(listObj, { [pathname]: tabLists[pathname] });
        } else if (listObj[pathname] && !listObj[pathname].content) {
            listObj[pathname].content = children;;
        }

        if (!stateTabLists) {
            this.setState({ stateTabLists: tabLists });
        }
        this.setState({
            activeKey: pathname,
            tabList: listObj
        }, () => {
            storage.session.set("Ones_Tabs", Object.keys(listObj));
        });
    }

    render() {
        const { tabList, activeKey } = this.state;
        return <Tabs
            className={styles.content_tab}
            activeKey={activeKey}
            onChange={this.onChange}
            tabBarStyle={{ background: '#fff' }}
            tabPosition="top"
            tabBarGutter={-1}
            hideAdd
            type="editable-card"
            onEdit={this.onEdit}
        >
            {Object.keys(tabList).map(item => {
                const { tab, key, closable, content } = tabList[item];
                return <TabPane tab={tab} key={key} closable={closable}>
                    {content}
                       </TabPane>
            })}
               </Tabs>
    }
}

export default TabPages