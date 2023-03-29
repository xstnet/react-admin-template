import{j as de,r as d,C as we,z as Je,t as D,u as Ge,c as Qe,R as J,a as ne,b as ue,M as Ze,B as ke,L as V,d as j,m as O,e as Xe,F as h,f as Ye,D as et,g as q,S as G,h as me,i as tt,k as nt,l as B,n as rt,A as Ae,o as at,p as ot,G as lt,U as st,E as he,q as it,s as z,v as C,w as Q,x as Z,y as oe,I as x,H as E,J as I,P as re,K as Ue,N as ct,T as ve,O as le,Q as Fe,V as L,W as Oe,X as $e,Y as dt,Z as ut,_ as W,$ as Re,a0 as mt,a1 as De,a2 as Be,a3 as ht,a4 as pe,a5 as Ee,a6 as pt,a7 as gt,a8 as X,a9 as ft,aa as yt,ab as bt,ac as kt,ad as vt,ae as xt,af as xe,ag as S,ah as K,ai as Ce,aj as Ct,ak as St}from"./vendor-4bcfdce5.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const l of o)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function r(o){const l={};return o.integrity&&(l.integrity=o.integrity),o.referrerPolicy&&(l.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?l.credentials="include":o.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(o){if(o.ep)return;o.ep=!0;const l=r(o);fetch(o.href,l)}})();const R=de.Fragment,e=de.jsx,m=de.jsxs,Se=[{label:"控制台",type:"group",children:[{label:"控制台",icon:"icon-dashboard",path:"/dashboard"}]},{label:"示例页面",type:"group",children:[{label:"列表页",icon:"icon-list",path:"/example/userList"},{label:"多级菜单",icon:"icon-list",path:"/multilevel/menu",children:[{label:"二级菜单",icon:"icon-list",path:"/multilevel/menu/2",children:[{label:"三级菜单",icon:"icon-list",path:"/multilevel/menu/2/3"}]}]},{label:"空白页",icon:"icon-example",path:"/blank"},{label:"404",icon:"icon-example",path:"/404"}]},{label:"徽标示例",type:"group",children:[{label:"红点徽标",icon:"icon-list",badge:"dot",path:"/blank"},{label:"数字徽标",icon:"icon-example",badge:98,path:"/blank"}]},{type:"divider"},{path:"/article",label:"文章管理",icon:"icon-article",children:[{path:"/article/list",label:"文章列表",icon:"icon-article"},{path:"/article/create",label:"发布文章",hideInMenu:!0,parent:"/article/list"},{path:"/article/update",label:"更新文章",hideInMenu:!0,parent:"/article/list"},{path:"/article/category",label:"分类管理",icon:"icon-list"}]},{path:"/iframe",label:"外部页面",icon:"icon-href",children:[{path:"https://ant-design.antgroup.com/components/overview-cn/",label:"antd文档(外链)",icon:"icon-document",key:"webpage-antd-document",type:"url"},{path:"https://ant-design.antgroup.com/components/overview-cn/",label:"antd文档(内嵌)",icon:"icon-document",type:"iframe"},{path:"https://www.xstnet.com",label:"博客主页(内嵌)",icon:"icon-document",type:"iframe"}]},{path:"/document",label:"文档",icon:"icon-document",children:[{path:"/document/start",label:"开始使用",icon:"icon-document"},{path:"/document/package.json",label:"Package文件说明",icon:"icon-document"}]},{type:"divider"},{path:"/user/center",label:"个人中心",icon:"icon-user-permissions",children:[{path:"/user/center/index",label:"个人中心",icon:"icon-example"},{path:"/user/center/update",label:"修改信息",icon:"icon-document"}]}];function je(t){return!!(typeof t.children>"u"||Array.isArray(t.children)&&t.children.length===0)}function ee(t){return ae(t)?!1:!!(typeof t.children<"u"&&Array.isArray(t.children)&&t.children.length>0)}function ge(t){return typeof t.path=="string"&&typeof t.label=="string"}function ae(t){return typeof t.type<"u"&&t.type==="group"}function It(t){return typeof t.type<"u"&&t.type==="divider"}const Pt=void 0,H=d.createContext(Pt),Tt=({children:t})=>{let n=0;const r=d.useMemo(()=>Se,[Se]),[a,o]=d.useState(r),[l,u]=d.useState(!1),{mapPathToMenu:s,mapKeyToMenu:i,processedMenuList:c}=d.useMemo(()=>(()=>{const f=new Map,v=new Map,P=y=>(y.key||(y.key=String(++n)),{...y}),T=y=>y.map(A=>{const b=P(A);return(ee(b)||ae(b))&&(b.children=T(b.children||[])),ge(b)&&v.set(b.path,b),b!=null&&b.key&&f.set(b.key,b),b});return{processedMenuList:T(a),mapKeyToMenu:f,mapPathToMenu:v}})(),[a]),g=d.useMemo(()=>({menuList:c,setMenuList:o,menuCollapsed:l,setMenuCollapsed:u,mapPathToMenu:s,mapKeyToMenu:i}),[a,l]);return e(H.Provider,{value:g,children:t})},U={pageTitle:"后台管理系统模板",pageTitlePrefix:"后台管理",tokenKey:"Authorization",apiBaseUrl:"https://xstnet.github.io/react-admin-template/api",iconFontUrl:"//at.alicdn.com/t/c/font_3917407_iepuc225qt9.js"};function Mt(t,n){localStorage.setItem(t,typeof n=="object"?JSON.stringify(n):n)}function Nt(t){localStorage.setItem(U.tokenKey,typeof t=="object"?JSON.stringify(t):t)}function qe(t){return localStorage.getItem(t)}function Lt(t){const n=localStorage.getItem(t);if(n!==null)return Number(n)}function wt(t){const n=localStorage.getItem(t);if(n!==null)return n==="true"}function At(t){const n=localStorage.getItem(t);if(n!==null)return JSON.parse(n)}function Ut(t){return qe(t)!==null}function Ft(t){localStorage.removeItem(t)}function Ot(){localStorage.removeItem(U.tokenKey)}function $t(){localStorage.clear()}const w={set:Mt,setToken:Nt,has:Ut,getString:qe,getObject:At,getBoolean:wt,getNumber:Lt,remove:Ft,removeToken:Ot,clear:$t},Ke=()=>{const[t,n]=d.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);return d.useEffect(()=>{const a=o=>{console.log("chage",o.matches),o.matches?n(!0):n(!1)};return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",a),()=>{window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",a)}},[]),[t?"dark":"light"]},Rt=void 0,Dt=d.createContext(Rt),Bt=({children:t})=>{const{settings:{primaryColor:n,theme:r,compactMode:a,followSystemTheme:o}}=d.useContext(_),[l]=Ke(),u={},s=()=>{const i=[];return o?i.push(l==="light"?D.defaultAlgorithm:D.darkAlgorithm):i.push(r==="light"?D.defaultAlgorithm:D.darkAlgorithm),console.log("algorighm",r,i),a&&i.push(D.compactAlgorithm),i};return e(Dt.Provider,{value:u,children:e(we,{locale:Je,theme:{algorithm:s(),token:{colorPrimary:n},components:{Button:{borderRadius:4,borderRadiusSM:2},Modal:{borderRadius:4,borderRadiusOuter:2}}},children:t})})},Et=void 0,_=d.createContext(Et),jt=({children:t})=>{const n=d.useMemo(()=>{const u=w.getObject("settings")||{};return console.log("settingsCache",u),{theme:"light",compactMode:!1,followSystemTheme:!1,fixedHeader:!0,fixedMenu:!0,primaryColor:"#00b96b",...u}},[]),[r,a]=d.useState(n),o=d.useCallback(u=>{const s={...r,...u};a(s),w.set("settings",s)},[r]),l={settings:r,setSetting:o};return e(_.Provider,{value:l,children:e(Bt,{children:t})})},qt=void 0,fe=d.createContext(qt),Kt=({children:t})=>{const[n,r]=d.useState(!1),[a,{toggleFullscreen:o}]=Ge(document.body),[l,u]=d.useState(null),s=d.useMemo(()=>({isLogin:n,setIsLogin:r,userInfo:l,setUserInfo:u,fullScreen:a,setFullScreen:o}),[n,l,a]);return e(fe.Provider,{value:s,children:e(jt,{children:e(Tt,{children:t})})})},$=Qe({scriptUrl:U.iconFontUrl,extraCommonProps:{}}),ye="/iframe",Ve=t=>`${ye}?url=${t}`,Vt=()=>{const t=ne(),{menuList:n,mapKeyToMenu:r,mapPathToMenu:a}=d.useContext(H);let o="/dashboard",l=[],u=!1;const{pathname:s}=location,[i]=ue(),c=k=>{const f=r.get(k.key);if(console.log("mapKeyToMenu",r),console.log("clicked menu",k,f),!f){console.warn("未获取到菜单信息");return}if(f.path!==s){if((f==null?void 0:f.type)==="url"){window.open(f.path,"_blank");return}if(document.title=`${U.pageTitlePrefix} - ${f.label}`,(f==null?void 0:f.type)==="iframe"){console.log("打开iframe页面"),t(Ve(f.path));return}t(f.path)}},g=d.useMemo(()=>{const k=v=>v.badge?v.badge==="dot"?e(ke,{className:"menu-item-badge",offset:[6,0],dot:!0,children:v.label}):e(ke,{className:"menu-item-badge",offset:[15,0],count:v.badge,children:v.label}):v.label,f=(v,P)=>{const T=[];return!u&&P&&l.push(P.key),v.map(p=>{var A;if(ge(p)&&(p.parent&&s.indexOf(p.path)===0&&(console.log("dddddd",a,a.get(p.parent),p.parent),o=((A=a.get(p.parent))==null?void 0:A.key)||"",u=!0),p.type==="iframe"&&(i.get("url")||"")===p.path&&(u=!0,o=p.key),p.hideInMenu))return;let y;if(It(p))y={...p};else if(ae(p))y={...p},p.children&&p.children.length>0&&(y.children=f(p.children));else if(ee(p)||je(p)){let{icon:b}=p;typeof b=="string"&&b.includes("icon-")&&(b=e($,{type:b})),y={key:"",...p,icon:b,label:k(p),children:ee(p)?f(p.children,p):void 0},!u&&p.path===s&&(o=p.key,u=!0)}y&&(y.key=y.key,T.push(y))}),!u&&l.pop(),T};return f(n)},[n]);return e(Ze,{style:{height:"100%"},onClick:c,mode:"inline",defaultSelectedKeys:[o],items:g,defaultOpenKeys:l})},zt=J.memo(Vt),be=()=>{const{token:t}=D.useToken();return t},Ht=()=>{const{menuCollapsed:t}=d.useContext(H),{colorBgContainer:n}=be();return e(V.Sider,{style:{background:n},trigger:null,className:"left-sider",collapsible:!0,collapsed:t,children:e(zt,{})})};function te(t=500){setTimeout(()=>{window.location.href="/react-admin-template/login"},t)}function Ie(t=500){setTimeout(()=>{window.location.href="/react-admin-template/dashboard"},t)}function ze(){}var se=(t=>(t[t.success=0]="success",t[t.noLogin=-10001]="noLogin",t[t.loginExpired=-10002]="loginExpired",t))(se||{}),He=(t=>(t[t.male=1]="male",t[t.female=2]="female",t))(He||{});const _t=10*1e3;j.defaults.baseURL=U.apiBaseUrl;j.defaults.headers.post["Content-Type"]="application/json; charset=utf-8";j.defaults.timeout=_t;j.interceptors.request.use(t=>(console.group(`${t.method}${t.url}${JSON.stringify(t.params)}`),t.headers.Authorization=`Bearer ${w.getString(U.tokenKey)}`,t),t=>Promise.reject(t));j.interceptors.response.use(t=>{const n=t.data;return typeof n.code!="number"?(O.error("系统错误",2),console.warn("api调用失败, 未正常返回数据, url:",t.config.url,"data:",n,"response:",t),console.groupEnd(),Promise.reject(t)):(console.log("Request log: ",t.config.url,t.data,t),console.groupEnd(),n.code===0?(t.config.method==="post"&&O.success(t.data.message),t):n.code===se.noLogin?(O.error("您还没有登录, 即将跳转到登录页面, 请稍后..."),w.remove(U.tokenKey),te(),Promise.reject(n)):n.code===se.loginExpired?(O.error("登录已失效, 即将跳转到登录页面..."),w.remove(U.tokenKey),te(),Promise.reject(n)):(O.error(n.message),Promise.reject(t)))},t=>(typeof t.message=="string"&&t.message==="Network Error"?O.error("网络错误, 请稍后再试!"):O.error("请求失败, 请稍后再试"),console.log("Request error",t),console.groupEnd(),Promise.reject(t)));const Wt=(t,n,r)=>{const a=r||{};return a.params=n,j.get(t,a)},Jt=(t,n,r)=>j.post(t,n,r),Gt=t=>j.request(t),M={get:Wt,post:Jt,request:Gt},N=t=>t.then(n=>Promise.resolve(n.data.data)).catch(n=>Promise.reject(n)),Qt=t=>{const n=M.post("/login",t);return N(n)},Zt=t=>N(M.get("/user/info",t)),Xt=t=>N(M.post("/user/logout",t)),Yt=(t,n)=>N(M.get("/user/list",{...t,...n})),en=t=>N(M.post("/user/create",t)),tn=t=>N(M.post("/user/update",t)),nn=t=>N(M.post("/user/delete",t)),rn=(t,n)=>N(M.get("/article/list",{...t,...n})),an=t=>N(M.get("/article/detail",t)),on=t=>N(M.post("/article/create",t)),ln=t=>N(M.post("/article/update",t)),sn=t=>N(M.post("/article/delete",t));const cn=t=>{const n=["#1890ff","#722ed1","#eb2f96","#00b96b","#52c41a","#13c2c2","#1677ff","#f5222d","#fa8c16","#faad14"],{onChange:r,presetColors:a=n,defaultSelectedColor:o=""}=t,{value:l=o}=t,[u,s]=d.useState(l),i=c=>{s(c),r==null||r(c)};return e("div",{className:"theme-color-wrap",children:a.map(c=>e("div",{onClick:()=>i(c),className:"theme-color-item",style:{backgroundColor:c},title:c,children:u===c&&e(Xe,{className:"checked-icon"})},c))})},dn=t=>{const{open:n,onClose:r=ze}=t,{settings:a,setSetting:o}=d.useContext(_),[l]=h.useForm(),[u]=Ke(),s=d.useMemo(()=>({...a,theme:a.followSystemTheme?"followSystem":a.theme,showFooter:void 0}),[a]),i=(c,g)=>{const k={...c},{theme:f,fixedMenu:v,fixedHeader:P}=k;f&&(console.log("themeee",f),k.followSystemTheme=!1,f==="followSystem"&&(k.followSystemTheme=!0,k.theme=u)),v&&(k.fixedHeader=!0),P===!1&&(k.fixedMenu=!1),o(k),console.log("chage",c,g)};return Ye(()=>{l==null||l.setFieldsValue(s)},[s]),e(et,{title:"偏好设置",onClose:r,open:n,children:m(h,{name:"basic",labelCol:{span:5},wrapperCol:{span:19},initialValues:{...s},autoComplete:"off",onValuesChange:i,form:l,children:[e(h.Item,{label:"外观",name:"theme",children:m(q.Group,{buttonStyle:"solid",children:[m(q.Button,{value:"light",children:[e($,{type:"icon-theme-light"})," 浅色"]}),m(q.Button,{value:"dark",children:[e($,{type:"icon-theme-dark"})," 深色"]}),m(q.Button,{value:"followSystem",children:[e($,{type:"icon-followSystem"})," 跟随系统"]})]})}),e(h.Item,{label:"紧凑模式",valuePropName:"checked",name:"compactMode",children:e(G,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{label:"主题色",name:"primaryColor",children:e(cn,{defaultSelectedColor:a.primaryColor})}),e(me,{children:"布局"}),e(h.Item,{label:"固定头部",valuePropName:"checked",name:"fixedHeader",children:e(G,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{help:"固定菜单启用时, 头部也会同步固定",label:"固定菜单",valuePropName:"checked",name:"fixedMenu",children:e(G,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{valuePropName:"checked",label:"显示页脚",name:"showFootor",children:e(G,{checkedChildren:"开启",unCheckedChildren:"关闭"})})]})})},un=t=>{const[n,r]=d.useState(!1);return m("div",{children:[e(dn,{open:n,onClose:()=>{r(!1)}}),e($,{onClick:()=>{r(!0)},title:"设置",type:"icon-setting",className:"action-icon"})]})},mn=()=>{const{fullScreen:t,setFullScreen:n,userInfo:r,setUserInfo:a,setIsLogin:o}=d.useContext(fe),{menuCollapsed:l,setMenuCollapsed:u}=d.useContext(H),{settings:{theme:s},setSetting:i}=d.useContext(_),{token:{colorBgContainer:c}}=D.useToken(),g=()=>{O.success(t?"已退出全屏模式":"进入全屏模式"),n(!t)},k=()=>{i({followSystemTheme:!1,theme:s==="light"?"dark":"light"})},f=()=>m("div",{className:"left",children:[m("div",{className:"logo",children:[e($,{type:"icon-react",className:"logo-img"}),e("span",{className:"logo-text",children:"React Admin Template"})]}),e("div",{children:J.createElement(l?tt:nt,{onClick:()=>u(!l)})})]}),v=()=>{const P=()=>m(R,{children:[e($,{title:"搜索",type:"icon-search",className:"action-icon"}),t?e(at,{title:"退出全屏模式",className:"action-icon",onClick:g}):e(ot,{title:"进入全屏模式",className:"action-icon",onClick:g}),e("a",{target:"_blank",className:"action-icon",title:"Go to Github",href:"https://github.com/xstnet/react-admin-template",rel:"norefer noopener",children:e(lt,{})}),s==="dark"?e($,{onClick:k,title:"主题-深色模式",type:"icon-theme-dark",className:"action-icon"}):e($,{onClick:k,title:"主题-明亮模式",type:"icon-theme-light",className:"action-icon"}),e(un,{})]}),T=[{label:e("a",{children:"个人中心"}),icon:e(st,{}),key:"userCenter"},{label:e("a",{children:"修改资料"}),key:"update",icon:e(he,{})},{type:"divider"},{label:"退出",icon:e(it,{}),key:"logout",onClick:()=>{Xt().then(()=>{w.removeToken(),o(!1),a(null),te()})}}];return e("div",{className:"right",children:m(B,{size:"middle",children:[P(),e(rt,{menu:{items:T},children:m(B,{className:"pointer",children:[e("span",{children:r==null?void 0:r.nickname}),e(Ae,{src:r==null?void 0:r.avatar})]})})]})})};return e(V.Header,{className:"header",style:{background:c},children:m(R,{children:[f(),v()]})})},hn=J.memo(mn),Pe=()=>e(R,{children:e("div",{children:m(z,{gutter:24,children:[e(C,{span:6,children:e(Q,{bordered:!1,children:e(Z,{title:"今日销售额",value:126560,precision:2,prefix:"$"})})}),e(C,{span:6,children:e(Q,{bordered:!1,children:e(Z,{title:"示例指标",value:11.28,precision:2,prefix:e(oe,{}),suffix:"%"})})}),e(C,{span:6,children:e(Q,{bordered:!1,children:e(Z,{title:"示例指标",value:11.28,precision:2,prefix:e(oe,{}),suffix:"%"})})}),e(C,{span:6,children:e(Q,{bordered:!1,children:e(Z,{title:"示例指标",value:11.28,precision:2,valueStyle:{color:"#3f8600"},prefix:e(oe,{}),suffix:"%"})})})]})})}),Te=()=>e("span",{children:"UserCenterPage"}),pn=()=>e("span",{children:"UserCenterUpdatePage"});const _e=d.forwardRef(({state:t},n)=>{const[r]=h.useForm(),a=d.useRef(null);return d.useImperativeHandle(n,()=>({form:r,input:a.current}),[r,a]),e("div",{children:m(h,{form:r,labelCol:{span:3},name:"userForm",initialValues:t||void 0,children:[e(h.Item,{name:"username",label:"账号",rules:[{required:!0,message:"请输入账号"}],children:e(x,{ref:a})}),e(h.Item,{name:"password",label:"密码",rules:[{required:!t,message:"请输入密码"}],children:e(x.Password,{})}),e(h.Item,{name:"nickname",label:"昵称",rules:[{required:!0,message:"请输入昵称"}],children:e(x,{})}),e(h.Item,{name:"gender",label:"性别",children:m(q.Group,{children:[e(q,{value:1,children:"男"}),e(q,{value:2,children:"女"})]})}),e(h.Item,{name:"mobile",label:"手机号",children:e(x,{})}),e(h.Item,{name:"email",label:"邮箱",children:e(x,{})})]})})}),gn=({refreshList:t})=>{const[n,r]=d.useState(!1),{run:a,loading:o}=E(en,{manual:!0,debounceWait:100,onSuccess:()=>{var s;r(!1),(s=l.current)==null||s.form.resetFields(),t==null||t()}}),l=d.useRef(null);return m("div",{children:[e(I,{type:"primary",icon:e(re,{}),onClick:()=>{r(!0),setTimeout(()=>{var s,i;(i=(s=l.current)==null?void 0:s.input)==null||i.focus()},100)},children:"新增用户"}),e(Ue,{open:n,title:"添加用户",okText:"添加",cancelText:"取消",confirmLoading:o,onCancel:()=>r(!1),onOk:()=>{var s;(s=l.current)==null||s.form.validateFields().then(i=>{a(i)}).catch(i=>console.log(i))},children:e(_e,{ref:l})})]})},fn=({search:t,form:n})=>e(h,{form:n,name:"advanced_search",style:{paddingTop:16},onFinish:a=>{console.log("Received values of form: ",a)},children:m(z,{gutter:24,children:[e(C,{span:6,children:e(h.Item,{name:"username",label:"账号",children:e(x,{placeholder:"账号"})})}),e(C,{span:6,children:e(h.Item,{name:"mobile",label:"手机号",children:e(x,{placeholder:"手机号"})})}),e(C,{span:6,children:e(h.Item,{name:"email",label:"邮箱",children:e(x,{placeholder:"邮箱"})})}),m(C,{span:6,style:{textAlign:"right"},children:[e(I,{onClick:t.reset,children:"重置"}),e(I,{style:{margin:"0 8px"},type:"primary",onClick:t.submit,children:"查询"})]})]})}),We=(t,n)=>{const r=ct(t,n),{tableProps:a}=r,o={...a.pagination,showTotal:(s,i)=>`第${i[0]}-${i[1]} 条/共 ${s} 条`,hideOnSinglePage:!0};a.pagination=o;const l=a.onChange,u=(...s)=>{var T;let[i,c,g,k]=s,f=i,v,P;Object.keys(g).length>0&&(Array.isArray(g)?(P={},g.map(p=>{var y;P[(y=p.column)==null?void 0:y.dataIndex]=p.order})):P={[(T=g.column)==null?void 0:T.dataIndex]:g.order}),Object.keys(c).length>0&&(v=c,console.log("filterrrrrrrrrrrrr",c)),l(f,v,P)};return a.onChange=u,r.tableProps.size="small",r},yn=({state:t,refreshList:n})=>{const[r,a]=d.useState(!1),{runAsync:o,loading:l}=E(tn,{manual:!0,debounceWait:100}),u=d.useRef(null);return m(R,{children:[e(I,{icon:e(he,{}),size:"small",onClick:()=>{a(!0),setTimeout(()=>{var i,c;(c=(i=u.current)==null?void 0:i.input)==null||c.focus()},100)},children:"编辑"}),e(Ue,{open:r,title:"更新用户信息用户",okText:"保存",cancelText:"取消",confirmLoading:l,onCancel:()=>a(!1),onOk:()=>{var i;(i=u.current)==null||i.form.validateFields().then(c=>{o({...c,id:t.id}).then(()=>{var g;a(!1),(g=u.current)==null||g.form.resetFields(),n==null||n()}).catch(ze)}).catch(c=>console.log(c))},children:e(_e,{ref:u,state:t})})]})};const F=t=>{const{children:n,className:r="",style:a={},...o}=t,{colorBgContainer:l}=be(),u="content-box",s={backgroundColor:l};return e("div",{className:`${u} ${r}`,style:{...s,...a},...o,children:n})},bn=()=>{var T;console.log("render ExampleUserListPage");const[t]=h.useForm(),[n,r]=d.useState([]),a=d.useRef();d.useEffect(()=>{a.current=new Map},[]);const{runAsync:o,loading:l}=E(nn,{manual:!0,debounceWait:100}),{refresh:u,tableProps:s,search:i}=We(Yt,{form:t}),c=()=>{i.reset(),i.submit()},g=p=>{var y;typeof p=="number"&&((y=a==null?void 0:a.current)==null||y.set(p,!0)),o({id:p}).then(()=>{typeof p=="object"&&r([]),u()}).finally(()=>{var A;return typeof p=="number"&&((A=a==null?void 0:a.current)==null?void 0:A.delete(p))})},k=d.useMemo(()=>[{title:"ID",dataIndex:"id"},{title:"头像",dataIndex:"avatar",render:p=>e(Ae,{src:p})},{title:"账号",dataIndex:"username"},{title:"昵称",dataIndex:"nickname"},{title:"性别",dataIndex:"gender",render:p=>p===He.male?e(ve,{color:"blue",children:"男"}):e(ve,{color:"error",children:"女"})},{title:"邮箱",dataIndex:"email"},{title:"手机号",dataIndex:"mobile",sorter:!0},{title:"注册时间",dataIndex:"create_time",sorter:!0},{title:"操作",key:"operation",fixed:"right",render:(p,y)=>{var b;const{id:A}=y;return m(B,{children:[e(le,{title:"确认要删除这条数据吗?",onConfirm:()=>g(A),children:e(I,{loading:(b=a==null?void 0:a.current)==null?void 0:b.has(A),icon:e(Fe,{}),size:"small",danger:!0,children:"删除"})}),e(yn,{state:y,refreshList:u})]})}}],[]),v={selectedRowKeys:n,onChange:p=>{console.log("selectedRowKeys changed: ",p),r(p)}},P=n.length>0;return m(R,{children:[m(F,{children:[e("div",{children:e(L.Title,{level:5,children:"搜索"})}),e(fn,{search:i,form:t})]}),e("br",{}),m(F,{children:[m("div",{className:"table-header",children:[e("div",{className:"left",children:e(L.Title,{level:5,children:"用户列表"})}),e("div",{className:"right",children:m(B,{size:"middle",children:[e(le,{title:`确定要删除这${n.length}条数据吗?`,onConfirm:()=>g(n),children:e(I,{type:"primary",danger:!0,disabled:!P,loading:l&&((T=a.current)==null?void 0:T.size)===0,children:"批量删除"})}),e(gn,{refreshList:c}),e(I,{type:"link",title:"点击刷新",onClick:u,icon:e(Oe,{})})]})})]}),e($e,{rowKey:"id",rowSelection:v,columns:k,...s})]})]})},Me=({title:t="空白页"})=>e(F,{style:{height:"500px"},children:e(L.Title,{level:4,children:t})}),kn=({search:t,form:n})=>e(h,{form:n,name:"advanced_search",style:{paddingTop:16},onFinish:a=>{console.log("Received values of form: ",a)},children:m(z,{gutter:24,children:[e(C,{span:6,children:e(h.Item,{name:"title",label:"主题",children:e(x,{placeholder:"标题"})})}),e(C,{span:6,children:e(h.Item,{name:"ahthor",label:"作者",children:e(x,{placeholder:"作者"})})}),e(C,{span:6,children:e(h.Item,{name:"create_time",label:"发布时间",children:e(dt.RangePicker,{})})}),m(C,{span:6,style:{textAlign:"right"},children:[e(I,{onClick:t.reset,children:"重置"}),e(I,{style:{margin:"0 8px"},type:"primary",onClick:t.submit,children:"查询"})]})]})});const Ne=()=>{console.log("render ArticleIndexPage");const[t]=h.useForm(),n=d.useRef();ne(),d.useEffect(()=>{n.current=new Map},[]);const{runAsync:r}=E(sn,{manual:!0,debounceWait:100}),{refresh:a,tableProps:o,search:l}=We(rn,{form:t}),u=i=>{var c;(c=n==null?void 0:n.current)==null||c.set(i,!0),r({id:i}).then(a).finally(()=>{var g;return(g=n==null?void 0:n.current)==null?void 0:g.delete(i)})},s=d.useMemo(()=>[{title:"ID",dataIndex:"id"},{title:"封面",dataIndex:"cover",render:i=>e(ut,{width:80,height:45,style:{borderRadius:4},src:i})},{title:"标题",dataIndex:"title"},{title:"简介",dataIndex:"description"},{title:"作者",dataIndex:"author"},{title:"发布时间",dataIndex:"create_time",sorter:!0},{title:"操作",key:"operation",fixed:"right",render:(i,c)=>{var k;const{id:g}=c;return m(B,{children:[e(le,{title:"确认要删除这条数据吗?",onConfirm:()=>u(g),children:e(I,{loading:(k=n==null?void 0:n.current)==null?void 0:k.has(g),icon:e(Fe,{}),size:"small",danger:!0,children:"删除"})}),e(W,{to:`/article/update/${g}`,children:e(I,{icon:e(he,{}),size:"small",children:"编辑"})})]})}}],[]);return m(R,{children:[m(F,{children:[e("div",{children:e(L.Title,{level:5,children:"搜索"})}),e(kn,{search:l,form:t})]}),e("br",{}),m(F,{children:[m("div",{className:"table-header",children:[e("div",{className:"left",children:e(L.Title,{level:5,children:"文章列表"})}),e("div",{className:"right",children:m(B,{size:"middle",children:[e(W,{to:"/article/create",children:e(I,{type:"primary",icon:e(re,{}),children:"发布文章"})}),e(I,{type:"link",title:"点击刷新",onClick:a,icon:e(Oe,{})})]})})]}),e($e,{rowKey:"id",columns:s,...o})]})]})},vn=()=>{const[t]=h.useForm(),n=ne(),r="articleDraft",{loading:a,run:o}=E(on,{manual:!0,debounceWait:200,onSuccess:()=>setTimeout(()=>{w.remove(r),n("/article/list")},200)}),l=w.getObject(r)||{},u=async()=>{const c=await t.validateFields();o(c)},s=()=>{const{cover:c,...g}=t.getFieldsValue();w.set(r,g),O.success("已保存到草稿箱")},i=c=>(console.log("Upload event:",c),Array.isArray(c)?c:c&&c.fileList);return m(F,{children:[e(L.Title,{level:3,children:"发布文章"}),e(me,{}),e(h,{form:t,name:"createForm",labelCol:{span:3},initialValues:l,children:m(z,{gutter:36,children:[m(C,{span:16,children:[e(h.Item,{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入标题"}],children:e(x,{})}),e(h.Item,{label:"简介",name:"description",children:e(x,{})}),e(h.Item,{label:"内容",name:"content",rules:[{required:!0,message:"请输入内容"}],children:e(x.TextArea,{rows:20})}),e(h.Item,{wrapperCol:{offset:3},children:m(B,{children:[e(I,{icon:e(Re,{}),onClick:u,loading:a,type:"primary",children:"发布文章"}),e(I,{icon:e(mt,{}),onClick:s,children:"保存为草稿"})]})})]}),m(C,{span:8,children:[e(h.Item,{label:"封面",name:"cover",getValueFromEvent:i,valuePropName:"fileList",children:e(De,{maxCount:1,listType:"picture-card",children:m("div",{children:[e(re,{}),e("div",{style:{marginTop:8},children:"选择图片"})]})})}),e(h.Item,{label:"标签",name:"tags",children:e(Be,{mode:"tags",placeholder:"文章标签"})}),e(h.Item,{label:"作者",name:"author",rules:[{required:!0,message:"请输入作者"}],children:e(x,{})})]})]})})]})},xn=()=>{const[t]=h.useForm(),n=ne(),r=ht(),{loading:a,run:o}=E(an,{manual:!0,debounceWait:10,onSuccess:c=>t.setFieldsValue(c)});d.useEffect(()=>{o({id:r.id})},[r.id]);const{loading:l,run:u}=E(ln,{manual:!0,debounceWait:200,onSuccess:()=>setTimeout(()=>{n("/article/list")},200)}),s=async()=>{const c=await t.validateFields();u(c)},i=c=>(console.log("Upload event:",c),Array.isArray(c)?c:c&&c.fileList);return m(F,{children:[e(L.Title,{level:3,children:"更新文章"}),e(me,{}),e(pe,{spinning:a,children:e(h,{form:t,name:"createForm",labelCol:{span:3},children:m(z,{gutter:36,children:[m(C,{span:16,children:[e(h.Item,{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入标题"}],children:e(x,{})}),e(h.Item,{label:"简介",name:"description",children:e(x,{})}),e(h.Item,{label:"内容",name:"content",rules:[{required:!0,message:"请输入内容"}],children:e(x.TextArea,{rows:20})}),e(h.Item,{wrapperCol:{offset:3},children:e(B,{children:e(I,{icon:e(Re,{}),onClick:s,loading:l,type:"primary",children:"保存"})})})]}),m(C,{span:8,children:[e(h.Item,{label:"封面",name:"cover",getValueFromEvent:i,valuePropName:"fileList",children:e(De,{maxCount:1,listType:"picture-card",children:m("div",{children:[e(re,{}),e("div",{style:{marginTop:8},children:"选择图片"})]})})}),e(h.Item,{label:"标签",name:"tags",children:e(Be,{mode:"tags",placeholder:"文章标签"})}),e(h.Item,{label:"作者",name:"author",rules:[{required:!0,message:"请输入作者"}],children:e(x,{})})]})]})})})]})},Cn=()=>{const t=Ee();return m(F,{style:{},children:[e(L.Title,{children:"404"}),e(L.Paragraph,{children:"页面不存在"}),m(L.Paragraph,{children:["路由: ",t.pathname]}),e(W,{to:"/",children:"回到首页"})]})};const Sn=t=>{const{title:n="Iframe Page",name:r="internal-iframe"}=t,a=d.useRef(null),[o,l]=d.useState(!0),[u]=ue();d.useEffect(()=>{l(!0)},[u]);const s=u.get("url"),i=()=>{l(!1)};return s?e(R,{children:e(F,{style:{height:"100%",padding:0},children:e(pe,{wrapperClassName:"iframeSpin",spinning:o,tip:"正在加载第三方页面, 请稍后...",children:e("iframe",{ref:a,width:"100%",height:"100%",onLoad:i,title:n,name:r,src:s})})})}):e(F,{children:e(pt,{message:"无效的url地址",type:"error"})})};function In(){return gt([{path:"/",element:e(Pe,{})},{path:"/dashboard",element:e(Pe,{})},{path:"/user",children:[{index:!0,element:e(Te,{})},{path:"/user/center/index",element:e(Te,{})},{path:"/user/center/update",element:e(pn,{})}]},{path:"/example/userList",element:e(bn,{})},{path:"/article",children:[{index:!0,element:e(Ne,{})},{path:"/article/list",element:e(Ne,{})},{path:"/article/create",element:e(vn,{})},{path:"/article/update/:id",element:e(xn,{})}]},{path:"/blank",element:e(Me,{})},{path:ye,element:e(Sn,{})},{path:"/multilevel/menu/2/3",element:e(Me,{title:"三级菜单"})},{path:"*",element:e(Cn,{})}])}const Pn=()=>e(V.Content,{className:"content",children:e(In,{})}),Tn=J.memo(Pn);const Y=new Map,ie=t=>{t.map(n=>{ge(n)&&(n==null?void 0:n.type)==="url"||(ae(n)&&ie(n.children||[]),(ee(n)||je(n))&&(n.path&&Y.set(n.path,n.label),n.children&&ie(n.children||[])))})},Mn=()=>{const{menuList:t}=d.useContext(H),n=d.useMemo(()=>(Y.clear(),ie(t),Y),[t]),r=Ee(),[a]=ue(),o=()=>{if(r.pathname===ye){const s=a.get("url");if(s&&Y.has(s))return[e(X.Item,{children:e(W,{style:{color:"inherit"},to:Ve(s),children:n.get(s)})},s)]}return[]},l=d.useMemo(()=>{const s=r.pathname.split("/").filter(i=>i);return s.map((i,c)=>{const g=`/${s.slice(0,c+1).join("/")}`;return n.has(g)?e(X.Item,{children:c===s.length-1?e(W,{style:{color:"inherit"},to:g,children:n.get(g)}):n.get(g)},g):null})},[r]),u=[e(X.Item,{children:e(ft,{})},"home"),...l,...o()];return e(X,{className:"breadcrumb",children:u})},Nn=J.memo(Mn);function Ln(t){const n=t.split(".")[1];if(n)try{return JSON.parse(yt(n))}catch(r){console.warn("Parse Token Error: ",r);return}}function ce(){var r;const t=w.getString(U.tokenKey);if(!t)return!1;const n=Ln(t);return n!==void 0&&((r=n==null?void 0:n.data)==null?void 0:r.uid)>0&&n.exp>new Date().getTime()/1e3}const wn=({loading:t,title:n})=>{const{settings:{theme:r}}=d.useContext(_);return e(pe,{size:"large",spinning:t,tip:n,wrapperClassName:`page-loading-spin-${r}`,children:e("div",{style:{height:"100vh",width:"100vw"}})})};const An=()=>{const[t,n]=d.useState(!0),{setIsLogin:r,setUserInfo:a}=d.useContext(fe),{menuCollapsed:o}=d.useContext(H),{colorBgContainer:l}=be(),{settings:{fixedMenu:u,fixedHeader:s}}=d.useContext(_);return d.useEffect(()=>{ce()&&Zt().then(i=>{n(!1),r(!0),a(i)}).catch(i=>{i instanceof bt&&kt.error({message:"网络错误",description:"获取用户信息失败, 无法打开页面",duration:null,closeIcon:null})})},[]),ce()?(console.log("default layout render..."),t?e(wn,{title:"页面加载中",loading:t}):m(V,{"data-fixed-menu":u?1:0,"data-menu-collapsed":o?1:0,"data-fixed-header":s?1:0,style:{background:l},className:"default-layout",children:[e(hn,{}),m(V,{children:[e(Ht,{}),m(V,{className:"content-layout",children:[e(Nn,{}),e(Tn,{})]})]})]})):(te(),e(R,{}))};const Un=()=>{const{loading:t,run:n}=E(Qt,{manual:!0,debounceWait:300,onSuccess:o=>{w.setToken(o.token),Ie()}});document.title=U.pageTitle;const r=o=>{n(o)};d.useEffect(()=>{ce()&&Ie()},[]);const a={remember:!0,username:"admin",password:"123456"};return e(R,{children:m(we,{theme:{algorithm:[D.defaultAlgorithm]},children:[e("div",{className:"bg-wrap"}),m(z,{className:"login-wrap",children:[e(C,{span:15,className:"login-banner"}),m(C,{span:9,className:"login-form-wrap",children:[e(L.Title,{style:{textAlign:"center"},children:"后台管理系统"}),e("br",{}),m(h,{name:"loginForm",labelCol:{span:5},wrapperCol:{span:19},style:{maxWidth:600},initialValues:a,onFinish:r,autoComplete:"off",children:[e(h.Item,{label:"用户名",name:"username",rules:[{required:!0,message:"请输入用户名!"}],children:e(x,{placeholder:"admin"})}),e(h.Item,{label:"密码",name:"password",rules:[{required:!0,message:"请输入密码!"}],children:e(x.Password,{placeholder:"123456"})}),e(h.Item,{name:"remember",valuePropName:"checked",wrapperCol:{offset:5},children:e(vt,{children:"记住我"})}),e(h.Item,{wrapperCol:{offset:5,span:16},children:e(I,{loading:t,type:"primary",htmlType:"submit",children:"登录"})})]})]})]})]})})};function Fn(){return d.useEffect(()=>{},[]),e(Kt,{children:e("div",{className:"App",children:m(xt,{children:[e(xe,{element:e(Un,{}),path:"/login"}),e(xe,{path:"*",element:e(An,{})})]})})})}function Le(t){const n=JSON.stringify({type:"JWT",alg:"HS256"}),r=Number((new Date().getTime()/1e3).toFixed(0)),a=JSON.stringify({iss:"github.com/xstnet",sub:"react-admin",iat:r,exp:r+86400*14,data:t}),o="H_97UyQUOmURnZdDwI0khuAt4Cmg";return`${Ce(n)}.${Ce(a)}.${o}`}S.mock(/api\/login/,"post",({body:t})=>{const{username:n,password:r}=JSON.parse(t);return n==="admin"?r!=="123456"?{code:-1,message:"密码错误"}:{code:0,message:"登录成功",data:{token:Le({uid:1})}}:{code:0,message:"登录成功",data:{token:Le({uid:K.Random.natural(2,1e4)})}}});S.setup({timeout:100});S.mock(/api\/user\/info/,"get",t=>({code:0,message:"ok",data:{id:1,username:"admin",nickname:"醉丶春风",avatar:"https://www.xstnet.com/static/images/head.gif",password:"",gender:K.Random.natural(1,2),email:"shantongxu@qq.com",mobile:"133xxxx3333"}}));S.mock(/api\/user\/logout/,"post",t=>({code:0,message:"退出成功"}));S.mock(/api\/user\/list/,"get",t=>{const n=new URLSearchParams(t.url);let r=Number(n.has("pageSize")?n.get("pageSize"):10);const a={code:0,message:"ok",data:{total:100,[`list|${r}`]:[{"id|+1":r,username:"@first@last",nickname:"@cname",avatar:()=>K.Random.dataImage("200x200"),email:"@email",mobile:()=>S.mock(/^1[3456789]\d{9}$/).replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"),"gender|1-2":0,create_time:"@date(yyyy-MM-dd HH:MM:ss)"}]}};return S.mock(a)});S.mock(/api\/user\/create/,"post",t=>({code:0,message:"创建成功",data:{id:K.Random.natural(100,9999)}}));S.mock(/api\/user\/update/,"post",t=>({code:0,message:"更新成功"}));S.mock(/api\/user\/delete/,"post",t=>({code:0,message:"删除成功"}));S.setup({timeout:100});S.mock(/api\/article\/detail/,"get",t=>(console.log("🚀 ~ file: article.ts:7 ~ Mock.mock ~ options:",t),{code:0,message:"ok",data:{id:1,title:"主题",description:"醉丶春风",author:"醉丶春风",tags:[1,2],content:"content",create_time:K.Random.datetime()}}));S.mock(/api\/article\/list/,"get",t=>{const n=new URLSearchParams(t.url);let r=Number(n.has("pageSize")?n.get("pageSize"):10);const a={code:0,message:"ok",data:{total:100,[`list|${r}`]:[{"id|+1":r,author:"@first@last",title:()=>S.Random.ctitle(5,20),description:"@cname",cover:()=>K.Random.dataImage("480x270","封面"),content:"@email",create_time:"@date(yyyy-MM-dd HH:MM:ss)"}]}};return S.mock(a)});S.mock(/api\/article\/create/,"post",t=>({code:0,message:"创建成功",data:{id:K.Random.natural(100,9999)}}));S.mock(/api\/article\/update/,"post",t=>({code:0,message:"更新成功"}));S.mock(/api\/article\/delete/,"post",t=>({code:0,message:"删除成功"}));Ct.createRoot(document.getElementById("root")).render(e(St,{basename:"/react-admin-template/",children:e(Fn,{})}));
