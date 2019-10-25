import { message } from 'antd';
import { wordsFormat } from '@/utils/publicWord';

export default function Ones_Message(txt, type = "error", dynamic) {
    return message[type](`${wordsFormat(txt)} ${dynamic || ''}`  );
}
