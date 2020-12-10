import Vue from "vue";
import {
  Button,
  TabPane,
  Tabs,
  FormItem,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Message
} from "element-ui";

//将组建提示框绑定到vue实例
Vue.prototype.$message = Message;
Vue.use(Button);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
