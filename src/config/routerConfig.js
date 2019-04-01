import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import ErrorPage from "../pages/nomatch";

// 各种UI
import Buttons from "../components/public/Buttons";
// 页面
import ArticleCreate from "../pages/article/create";
import ArticleList from "../pages/article/list";
import System from "../pages/system/index";

/*
interface routerConfigModel {
  path:string,
  component?:any,
  auth?:boolean
}
*/

const ARTICLE = "文章管理";

export const routerConfig = [
  {
    path: "/",
    component: HomePage,
    auth: true
  },
  {
    path: "/home",
    component: HomePage,
    auth: true,
    title: "首页"
  },
  // 页面--------------------------
  {
    path: "/article/:id",
    component: ArticleCreate,
    auth: true,
    parent: ARTICLE,
    title: "发布文章"
  },
  {
    path: "/article",
    component: ArticleList,
    auth: true,
    parent: ARTICLE,
    title: "文章列表"
  },
  {
    path: "/system",
    component: System,
    auth: true,
    title: "系统设置"
  },
  {
    path: "/system/label",
    component: System,
    auth: true,
    parent: "系统设置",
    title: "标签设置"
  },
  {
    path: "/system/category",
    component: System,
    auth: true,
    parent: "系统设置",
    title: "分类设置"
  },
  // UI---------------------------
  {
    path: "/ui/buttons",
    component: Buttons,
    auth: true
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/404",
    component: ErrorPage
  },
];
