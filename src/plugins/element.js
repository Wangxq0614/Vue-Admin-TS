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
  Message,
  Container,
  Header,
  Main,
  Aside,
  Footer,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Select,
  Option,
  Table,
  TableColumn,
  Switch,
  Pagination,
  Dialog
} from "element-ui";

//将组建提示框绑定到vue实例
Vue.prototype.$message = Message;
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(Row);
Vue.use(Col);
Vue.use(Checkbox);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Footer);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Card);
