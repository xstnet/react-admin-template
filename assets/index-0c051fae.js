import{j as fe,r as c,C as He,z as at,t as B,u as ot,c as lt,R as ee,a as z,b as ye,d as se,M as it,B as Ne,L as E,e as Y,m as O,f as st,F as h,g as ct,D as dt,h as j,S as ne,i as be,k as ut,l as mt,n as L,o as ht,A as Ke,p as pt,q as gt,G as ft,U as yt,E as ke,s as bt,v as X,w as H,x as G,T as ve,y as N,I,H as M,P as te,J as _e,K as kt,N as Ce,O as qe,Q as vt,V as Ct,X as xt,Y as St,W as Ye,Z as It,_ as K,$ as S,a0 as re,a1 as ue,a2 as Mt,a3 as Pt,a4 as Tt,a5 as _,a6 as Ve,a7 as Nt,a8 as we,a9 as me,aa as je,ab as wt,ac as Lt,ad as Ee,ae as At,af as ze,ag as We,ah as Ft,ai as xe,aj as Ut,ak as $t,al as ae,am as Ot,an as Dt,ao as Je,ap as Rt,aq as Bt,ar as Ht,as as Le,at as P,au as W,av as Ae,aw as Kt,ax as _t}from"./vendor-107ec350.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const o of l)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function r(l){const o={};return l.integrity&&(o.integrity=l.integrity),l.referrerPolicy&&(o.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?o.credentials="include":l.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(l){if(l.ep)return;l.ep=!0;const o=r(l);fetch(l.href,o)}})();const q=fe.Fragment,e=fe.jsx,s=fe.jsxs,Fe=[{label:"控制台",type:"group",children:[{label:"控制台",icon:"icon-dashboard",path:"/dashboard"}]},{label:"示例页面",type:"group",children:[{label:"列表页",icon:"icon-list",path:"/example/userList"},{label:"多级菜单",icon:"icon-list",path:"/multilevel/menu",children:[{label:"二级菜单",icon:"icon-list",path:"/multilevel/menu/2",children:[{label:"三级菜单",icon:"icon-list",path:"/multilevel/menu/2/3"}]}]},{label:"空白页",icon:"icon-example",path:"/blank"},{label:"404",icon:"icon-example",path:"/404"}]},{label:"徽标示例",type:"group",children:[{label:"红点徽标",icon:"icon-list",badge:"dot",path:"/blank"},{label:"数字徽标",icon:"icon-example",badge:98,path:"/blank"}]},{type:"divider"},{path:"/article",label:"文章管理",icon:"icon-article",children:[{path:"/article/list",label:"文章列表",icon:"icon-article"},{path:"/article/create",label:"发布文章",hideInMenu:!0,parent:"/article/list"},{path:"/article/update",label:"更新文章",hideInMenu:!0,parent:"/article/list"},{path:"/article/category",label:"分类管理",icon:"icon-list"}]},{path:"/iframe",label:"外部页面",icon:"icon-href",children:[{path:"https://ant-design.antgroup.com/components/overview-cn/",label:"antd文档(外链)",icon:"icon-document",key:"webpage-antd-document",type:"url"},{path:"https://ant-design.antgroup.com/components/overview-cn/",label:"antd文档(内嵌)",icon:"icon-document",type:"iframe"},{path:"https://www.xstnet.com",label:"博客主页(内嵌)",icon:"icon-document",type:"iframe"}]},{path:"/document",label:"文档",icon:"icon-document",children:[{path:"/document/start",label:"开始使用",icon:"icon-document"},{path:"/document/package.json",label:"Package文件说明",icon:"icon-document"}]},{type:"divider"},{path:"/user/center",label:"个人中心",icon:"icon-user-permissions",children:[{path:"/user/center/index",label:"个人中心",icon:"icon-example"},{path:"/user/center/update",label:"修改信息",icon:"icon-document"}]}];function Ge(t){return!!(typeof t.children>"u"||Array.isArray(t.children)&&t.children.length===0)}function ie(t){return ce(t)?!1:!!(typeof t.children<"u"&&Array.isArray(t.children)&&t.children.length>0)}function Se(t){return typeof t.path=="string"&&typeof t.label=="string"}function ce(t){return typeof t.type<"u"&&t.type==="group"}function qt(t){return typeof t.type<"u"&&t.type==="divider"}const Yt=void 0,Q=c.createContext(Yt),Vt=({children:t})=>{let n=0;const r=c.useMemo(()=>Fe,[Fe]),[a,l]=c.useState(r),[o,m]=c.useState(!1),{mapPathToMenu:i,mapKeyToMenu:u,processedMenuList:d}=c.useMemo(()=>(()=>{const v=new Map,k=new Map,f=T=>(T.key||(T.key=String(++n)),{...T}),x=T=>T.map(y=>{const C=f(y);return(ie(C)||ce(C))&&(C.children=x(C.children||[])),Se(C)&&k.set(C.path,C),C!=null&&C.key&&v.set(C.key,C),C});return{processedMenuList:x(a),mapKeyToMenu:v,mapPathToMenu:k}})(),[a]),p=c.useMemo(()=>({menuList:d,setMenuList:l,menuCollapsed:o,setMenuCollapsed:m,mapPathToMenu:i,mapKeyToMenu:u}),[a,o]);return e(Q.Provider,{value:p,children:t})},U={pageTitle:"后台管理系统模板",pageTitlePrefix:"后台管理",tokenKey:"Authorization",apiBaseUrl:"https://xstnet.github.io/react-admin-template/api",iconFontUrl:"//at.alicdn.com/t/c/font_3917407_iepuc225qt9.js"};function jt(t,n){localStorage.setItem(t,typeof n=="object"?JSON.stringify(n):n)}function Et(t){localStorage.setItem(U.tokenKey,typeof t=="object"?JSON.stringify(t):t)}function Qe(t){return localStorage.getItem(t)}function zt(t){const n=localStorage.getItem(t);if(n!==null)return Number(n)}function Wt(t){const n=localStorage.getItem(t);if(n!==null)return n==="true"}function Jt(t){const n=localStorage.getItem(t);if(n!==null)return JSON.parse(n)}function Gt(t){return Qe(t)!==null}function Qt(t){localStorage.removeItem(t)}function Xt(){localStorage.removeItem(U.tokenKey)}function Zt(){localStorage.clear()}const w={set:jt,setToken:Et,has:Gt,getString:Qe,getObject:Jt,getBoolean:Wt,getNumber:zt,remove:Qt,removeToken:Xt,clear:Zt},Xe=()=>{const[t,n]=c.useState(window.matchMedia("(prefers-color-scheme: dark)").matches);return c.useEffect(()=>{const a=l=>{console.log("chage",l.matches),l.matches?n(!0):n(!1)};return window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",a),()=>{window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change",a)}},[]),[t?"dark":"light"]},en=void 0,tn=c.createContext(en),nn=({children:t})=>{const{settings:{primaryColor:n,theme:r,compactMode:a,followSystemTheme:l}}=c.useContext(V),[o]=Xe(),m={},i=()=>{const u=[];return l?u.push(o==="light"?B.defaultAlgorithm:B.darkAlgorithm):u.push(r==="light"?B.defaultAlgorithm:B.darkAlgorithm),console.log("algorighm",r,u),a&&u.push(B.compactAlgorithm),u};return e(tn.Provider,{value:m,children:e(He,{locale:at,theme:{algorithm:i(),token:{colorPrimary:n},components:{Button:{borderRadius:4,borderRadiusSM:2},Modal:{borderRadius:4,borderRadiusOuter:2}}},children:t})})},rn=void 0,V=c.createContext(rn),an=({children:t})=>{const n=c.useMemo(()=>{const m=w.getObject("settings")||{};return console.log("settingsCache",m),{theme:"light",compactMode:!1,followSystemTheme:!1,fixedHeader:!0,fixedMenu:!0,showFooter:!0,primaryColor:"#00b96b",...m}},[]),[r,a]=c.useState(n),l=c.useCallback(m=>{const i={...r,...m};a(i),w.set("settings",i)},[r]),o={settings:r,setSetting:l};return e(V.Provider,{value:o,children:e(nn,{children:t})})},on=void 0,Ie=c.createContext(on),ln=({children:t})=>{const[n,r]=c.useState(!1),[a,{toggleFullscreen:l}]=ot(document.body),[o,m]=c.useState(null),i=c.useMemo(()=>({isLogin:n,setIsLogin:r,userInfo:o,setUserInfo:m,fullScreen:a,setFullScreen:l}),[n,o,a]);return e(Ie.Provider,{value:i,children:e(an,{children:e(Vt,{children:t})})})},D=lt({scriptUrl:U.iconFontUrl,extraCommonProps:{}}),Me="/iframe",Ze=t=>`${Me}?url=${t}`,sn=()=>{var v;const t=z(),n=ye(),{menuList:r,mapKeyToMenu:a,mapPathToMenu:l}=c.useContext(Q);let o=((v=l.get("/dashboard"))==null?void 0:v.key)||"",m=[],i=!1;const{pathname:u}=n,[d]=se(),p=k=>{const f=a.get(k.key);if(console.log("mapKeyToMenu",a),console.log("clicked menu",k,f),!f){console.warn("未获取到菜单信息");return}if(f.path!==u){if((f==null?void 0:f.type)==="url"){window.open(f.path,"_blank");return}if(document.title=`${U.pageTitlePrefix} - ${f.label}`,(f==null?void 0:f.type)==="iframe"){console.log("打开iframe页面"),t(Ze(f.path));return}t(f.path)}},g=c.useMemo(()=>{const k=x=>x.badge?x.badge==="dot"?e(Ne,{className:"menu-item-badge",offset:[6,0],dot:!0,children:x.label}):e(Ne,{className:"menu-item-badge",offset:[15,0],count:x.badge,children:x.label}):x.label,f=(x,b)=>{const T=[];return!i&&b&&m.push(b.key),x.map(y=>{var Te;if(Se(y)&&(y.parent&&u.indexOf(y.path)===0&&(o=((Te=l.get(y.parent))==null?void 0:Te.key)||"",i=!0),y.type==="iframe"&&(d.get("url")||"")===y.path&&(i=!0,o=y.key),y.hideInMenu))return;let C;if(qt(y))C={...y};else if(ce(y))C={...y},y.children&&y.children.length>0&&(C.children=f(y.children));else if(ie(y)||Ge(y)){let{icon:J}=y;typeof J=="string"&&J.includes("icon-")&&(J=e(D,{type:J})),C={key:"",...y,icon:J,label:k(y),children:ie(y)?f(y.children,y):void 0},!i&&y.path===u&&(o=y.key,i=!0)}C&&(C.key=C.key,T.push(C))}),!i&&m.pop(),T};return f(r)},[r]);return e(it,{style:{height:"100%"},onClick:p,mode:"inline",defaultSelectedKeys:[o],items:g,defaultOpenKeys:m})},cn=ee.memo(sn),de=()=>{const{token:t}=B.useToken();return t},dn=()=>{const{menuCollapsed:t}=c.useContext(Q),{colorBgContainer:n}=de();return e(E.Sider,{style:{background:n},trigger:null,className:"left-sider",collapsible:!0,collapsed:t,children:e(cn,{})})};var he=(t=>(t[t.success=0]="success",t[t.noLogin=-10001]="noLogin",t[t.loginExpired=-10002]="loginExpired",t))(he||{}),et=(t=>(t[t.male=1]="male",t[t.female=2]="female",t))(et||{}),R=(t=>(t[t.incomplete=1]="incomplete",t[t.completed=2]="completed",t[t.deleted=10]="deleted",t))(R||{}),Pe=(t=>(t.day="YYYY-MM-DD",t.second="YYYY-MM-DD HH:mm:ss",t.minute="YYYY-MM-DD HH:mm",t.hour="YYYY-MM-DD HH",t))(Pe||{});function tt(){}function Z(t,n){return Math.floor(Math.random()*(n-t+1))+t}const un=10*1e3;Y.defaults.baseURL=U.apiBaseUrl;Y.defaults.headers.post["Content-Type"]="application/json; charset=utf-8";Y.defaults.timeout=un;Y.interceptors.request.use(t=>(console.group(`${t.method}${t.url}${JSON.stringify(t.params)}`),t.headers.Authorization=`Bearer ${w.getString(U.tokenKey)}`,t),t=>Promise.reject(t));Y.interceptors.response.use(t=>{const n=t.data;return typeof n.code!="number"?(O.error("系统错误",2),console.warn("api调用失败, 未正常返回数据, url:",t.config.url,"data:",n,"response:",t),console.groupEnd(),Promise.reject(t)):(console.log("Request log: ",t.config.url,t.data,t),console.groupEnd(),n.code===0?(t.config.method==="post"&&O.success(t.data.message),t):n.code===he.noLogin?(O.error("您还没有登录, 即将跳转到登录页面, 请稍后..."),w.remove(U.tokenKey),location.reload(),Promise.reject(n)):n.code===he.loginExpired?(O.error("登录已失效, 即将跳转到登录页面..."),w.remove(U.tokenKey),location.reload(),Promise.reject(n)):(O.error(n.message),Promise.reject(t)))},t=>(typeof t.message=="string"&&t.message==="Network Error"?O.error("网络错误, 请稍后再试!"):O.error("请求失败, 请稍后再试"),console.log("Request error",t),console.groupEnd(),Promise.reject(t)));const mn=(t,n,r)=>{const a=r||{};return a.params=n,Y.get(t,a)},hn=(t,n,r)=>Y.post(t,n,r),pn=t=>Y.request(t),A={get:mn,post:hn,request:pn},F=t=>t.then(n=>Promise.resolve(n.data.data)).catch(n=>Promise.reject(n)),gn=t=>{const n=A.post("/login",t);return F(n)},fn=t=>F(A.get("/user/info",t)),yn=t=>F(A.post("/user/logout",t)),bn=(t,n)=>F(A.get("/user/list",{...t,...n})),kn=t=>F(A.post("/user/create",t)),vn=t=>F(A.post("/user/update",t)),Cn=t=>F(A.post("/user/delete",t)),xn=(t,n)=>F(A.get("/article/list",{...t,...n})),Sn=t=>F(A.get("/article/detail",t)),In=t=>F(A.post("/article/create",t)),Mn=t=>F(A.post("/article/update",t)),Pn=t=>F(A.post("/article/delete",t));const Tn=t=>{const n=["#1890ff","#722ed1","#eb2f96","#00b96b","#52c41a","#13c2c2","#1677ff","#f5222d","#fa8c16","#faad14"],{onChange:r,presetColors:a=n,defaultSelectedColor:l=""}=t,{value:o=l}=t,[m,i]=c.useState(o),u=d=>{i(d),r==null||r(d)};return e("div",{className:"theme-color-wrap",children:a.map(d=>e("div",{onClick:()=>u(d),className:"theme-color-item",style:{backgroundColor:d},title:d,children:m===d&&e(st,{className:"checked-icon"})},d))})},Nn=t=>{const{open:n,onClose:r=tt}=t,{settings:a,setSetting:l}=c.useContext(V),[o]=h.useForm(),[m]=Xe(),i=c.useMemo(()=>({...a,theme:a.followSystemTheme?"followSystem":a.theme}),[a]),u=(d,p)=>{const g={...d},{theme:v,fixedMenu:k,fixedHeader:f}=g;v&&(console.log("themeee",v),g.followSystemTheme=!1,v==="followSystem"&&(g.followSystemTheme=!0,g.theme=m)),k&&(g.fixedHeader=!0),f===!1&&(g.fixedMenu=!1),l(g),console.log("chage",d,p)};return ct(()=>{o==null||o.setFieldsValue(i)},[i]),e(dt,{title:"偏好设置",onClose:r,open:n,children:s(h,{name:"basic",labelCol:{span:5},wrapperCol:{span:19},initialValues:{...i},autoComplete:"off",onValuesChange:u,form:o,children:[e(h.Item,{label:"外观",name:"theme",children:s(j.Group,{buttonStyle:"solid",children:[s(j.Button,{value:"light",children:[e(D,{type:"icon-theme-light"})," 浅色"]}),s(j.Button,{value:"dark",children:[e(D,{type:"icon-theme-dark"})," 深色"]}),s(j.Button,{value:"followSystem",children:[e(D,{type:"icon-followSystem"})," 跟随系统"]})]})}),e(h.Item,{label:"紧凑模式",valuePropName:"checked",name:"compactMode",children:e(ne,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{label:"主题色",name:"primaryColor",children:e(Tn,{defaultSelectedColor:a.primaryColor})}),e(be,{children:"布局"}),e(h.Item,{label:"固定头部",valuePropName:"checked",name:"fixedHeader",children:e(ne,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{help:"固定菜单启用时, 头部也会同步固定",label:"固定菜单",valuePropName:"checked",name:"fixedMenu",children:e(ne,{checkedChildren:"开启",unCheckedChildren:"关闭"})}),e(h.Item,{valuePropName:"checked",label:"显示页脚",name:"showFooter",children:e(ne,{checkedChildren:"开启",unCheckedChildren:"关闭"})})]})})},wn=t=>{const[n,r]=c.useState(!1);return s("div",{children:[e(Nn,{open:n,onClose:()=>{r(!1)}}),e(D,{onClick:()=>{r(!0)},title:"设置",type:"icon-setting",className:"action-icon"})]})},Ln=()=>{const{fullScreen:t,setFullScreen:n,userInfo:r,setUserInfo:a,setIsLogin:l}=c.useContext(Ie),{menuCollapsed:o,setMenuCollapsed:m}=c.useContext(Q),{settings:{theme:i},setSetting:u}=c.useContext(V),{token:{colorBgContainer:d}}=B.useToken(),p=z(),g=()=>{O.success(t?"已退出全屏模式":"进入全屏模式"),n(!t)},v=()=>{u({followSystemTheme:!1,theme:i==="light"?"dark":"light"})},k=()=>s("div",{className:"left",children:[s("div",{className:"logo",children:[e(D,{type:"icon-react",className:"logo-img"}),e("span",{className:"logo-text",children:"React Admin Template"})]}),e("div",{children:ee.createElement(o?ut:mt,{onClick:()=>m(!o)})})]}),f=()=>{const x=()=>s(q,{children:[e(D,{title:"搜索",type:"icon-search",className:"action-icon"}),t?e(pt,{title:"退出全屏模式",className:"action-icon",onClick:g}):e(gt,{title:"进入全屏模式",className:"action-icon",onClick:g}),e("a",{target:"_blank",className:"action-icon",title:"Go to Github",href:"https://github.com/xstnet/react-admin-template",rel:"norefer noopener",children:e(ft,{})}),i==="dark"?e(D,{onClick:v,title:"主题-深色模式",type:"icon-theme-dark",className:"action-icon"}):e(D,{onClick:v,title:"主题-明亮模式",type:"icon-theme-light",className:"action-icon"}),e(wn,{})]}),b=[{label:e("a",{children:"个人中心"}),icon:e(yt,{}),key:"userCenter"},{label:e("a",{children:"修改资料"}),key:"update",icon:e(ke,{})},{type:"divider"},{label:"退出",icon:e(bt,{}),key:"logout",onClick:()=>{yn().then(()=>{w.removeToken(),l(!1),a(null),p("/login")})}}];return e("div",{className:"right",children:s(L,{size:"middle",children:[x(),e(ht,{menu:{items:b},children:s(L,{className:"pointer",children:[e("span",{children:r==null?void 0:r.nickname}),e(Ke,{src:r==null?void 0:r.avatar})]})})]})})};return e(E.Header,{className:"header",style:{background:d},children:s(q,{children:[k(),f()]})})},An=ee.memo(Ln),Fn=()=>{const t=[{title:"昵称",dataIndex:"nickname",key:"nickname"},{title:"登录IP",dataIndex:"loginIp",key:"loginIp"},{title:"登录时间",dataIndex:"create_time",key:"create_time"}],n=Array(5).fill({id:Z(10,1e5),userId:1,loginIp:"127.0.0.1",nickname:"admin",create_time:X().format(Pe.second)});return e(H,{title:"登录历史",extra:e(G,{to:"/",children:"查看更多"}),children:e(ve,{pagination:!1,size:"small",columns:t,dataSource:n})})},Un=N.Text,oe=()=>X().format(Pe.second),$n=()=>{const[t,n]=c.useState(0),{colorError:r}=de(),[a,l]=c.useState([{id:Z(100,1e9),name:"多tab布局支持",status:R.incomplete,create_time:oe(),update_time:oe()},{id:1,name:"这是一个todo例子",status:R.completed,create_time:oe(),update_time:oe()}]),[o,m]=c.useState(""),i=()=>{o&&(l([{name:o,status:R.incomplete,id:Z(100,1e9),create_time:X().format("YYYY-MM-DD HH:MM:SS"),update_time:X().format("YYYY-MM-DD HH:MM:SS")},...a]),m(""))},u=(g,v)=>{l(a.map(k=>k.id!==g?k:{...k,status:v?R.completed:R.incomplete}))},d=(g,v)=>{console.log("iii",g,v),l(a.map(k=>k.id!==g?k:{...k,name:v}))},p=g=>{l(a.filter(v=>v.id!==g))};return e(H,{title:"待办事项",children:s(L,{direction:"vertical",style:{width:"100%"},children:[s(L.Compact,{style:{width:"100%",marginBottom:"16px"},children:[e(I,{value:o,onChange:g=>m(g.target.value),placeholder:"添加新事项",onPressEnter:i}),e(M,{onClick:i,type:"primary",icon:e(te,{})})]}),a.map(({id:g,status:v,name:k})=>{const f=v===R.completed,x=t===g&&v===R.incomplete;return e(_e,{onChange:({target:{checked:b}})=>u(g,b),checked:f,children:e(Un,{type:f?"secondary":void 0,delete:f,onMouseEnter:()=>n(g),onMouseLeave:()=>n(0),editable:x?{onChange:b=>d(g,b)}:!1,children:s(L,{children:[k,x&&e(kt,{title:"删除",children:e(Ce,{onClick:()=>p(g),style:{color:r}})})]})})},g)})]})})},On=()=>{const[t,n]=c.useState("pv"),r=[{tab:"访问量",key:"pv"},{tab:"IP",key:"ip"}],a={pv:{stroke:"#8884d8",fill:"#b5b1e6"},ip:{stroke:"#00b96b",fill:"#82ca9d"}},l=Array.from({length:7}).map((o,m)=>({name:X().subtract(m+1,"day").format("MM-DD"),pv:Z(1e3,1e4),ip:Z(100,1e3)})).reverse();return e(H,{activeTabKey:t,onTabChange:o=>n(o),tabList:r,children:e(qe,{width:"100%",height:300,children:s(vt,{data:l,children:[e(Ct,{strokeDasharray:"3 3"}),e(xt,{dataKey:"name"}),e(St,{}),e(Ye,{wrapperStyle:{outline:"none"}}),e(It,{type:"monotone",strokeWidth:2,dataKey:t,stroke:a[t].stroke,fill:a[t].fill})]})})})},Ue=[{name:"视频类",value:400},{name:"图文类",value:300},{name:"资讯类",value:300}],$e=()=>e(q,{children:s("div",{children:[s(K,{gutter:24,children:[e(S,{span:6,children:e(H,{bordered:!1,children:e(re,{title:"今日销售额",value:126560,precision:2,prefix:"$"})})}),e(S,{span:6,children:e(H,{bordered:!1,children:e(re,{title:"示例指标",value:11.28,precision:2,prefix:e(ue,{}),suffix:"%"})})}),e(S,{span:6,children:e(H,{bordered:!1,children:e(re,{title:"示例指标",value:11.28,precision:2,prefix:e(ue,{}),suffix:"%"})})}),e(S,{span:6,children:e(H,{bordered:!1,children:e(re,{title:"示例指标",value:11.28,precision:2,valueStyle:{color:"#3f8600"},prefix:e(ue,{}),suffix:"%"})})})]}),e("br",{}),s(K,{gutter:16,children:[e(S,{span:18,style:{height:300},children:e(On,{})}),e(S,{span:6,children:e(H,{title:"内容占比",children:e(qe,{width:"100%",height:300,children:s(Mt,{width:400,height:400,children:[e(Pt,{data:Ue,dataKey:"value",nameKey:"name",cx:"50%",cy:"50%",outerRadius:90,label:!0,children:Ue.map((t,n)=>e(Tt,{fill:["#0088FE","#00C49F","#FFBB28"][n%3]},`cell-${n}`))}),e(Ye,{wrapperStyle:{outline:"none"}})]})})})})]}),e("br",{}),s(K,{gutter:16,children:[e(S,{span:12,children:e($n,{})}),e(S,{span:12,children:e(Fn,{})})]})]})}),Oe=()=>e("span",{children:"UserCenterPage"}),Dn=()=>e("span",{children:"UserCenterUpdatePage"});const nt=c.forwardRef(({state:t},n)=>{const[r]=h.useForm(),a=c.useRef(null);return c.useImperativeHandle(n,()=>({form:r,input:a.current}),[r,a]),e("div",{children:s(h,{form:r,labelCol:{span:3},name:"userForm",initialValues:t||void 0,children:[e(h.Item,{name:"username",label:"账号",rules:[{required:!0,message:"请输入账号"}],children:e(I,{ref:a})}),e(h.Item,{name:"password",label:"密码",rules:[{required:!t,message:"请输入密码"}],children:e(I.Password,{})}),e(h.Item,{name:"nickname",label:"昵称",rules:[{required:!0,message:"请输入昵称"}],children:e(I,{})}),e(h.Item,{name:"gender",label:"性别",children:s(j.Group,{children:[e(j,{value:1,children:"男"}),e(j,{value:2,children:"女"})]})}),e(h.Item,{name:"mobile",label:"手机号",children:e(I,{})}),e(h.Item,{name:"email",label:"邮箱",children:e(I,{})})]})})}),Rn=({refreshList:t})=>{const[n,r]=c.useState(!1),{run:a,loading:l}=_(kn,{manual:!0,debounceWait:100,onSuccess:()=>{var i;r(!1),(i=o.current)==null||i.form.resetFields(),t==null||t()}}),o=c.useRef(null);return s("div",{children:[e(M,{type:"primary",icon:e(te,{}),onClick:()=>{r(!0),setTimeout(()=>{var i,u;(u=(i=o.current)==null?void 0:i.input)==null||u.focus()},100)},children:"新增用户"}),e(Ve,{open:n,title:"添加用户",okText:"添加",cancelText:"取消",confirmLoading:l,onCancel:()=>r(!1),onOk:()=>{var i;(i=o.current)==null||i.form.validateFields().then(u=>{a(u)}).catch(u=>console.log(u))},children:e(nt,{ref:o})})]})},Bn=({search:t,form:n})=>e(h,{form:n,name:"advanced_search",style:{paddingTop:16},onFinish:a=>{console.log("Received values of form: ",a)},children:s(K,{gutter:24,children:[e(S,{span:6,children:e(h.Item,{name:"username",label:"账号",children:e(I,{placeholder:"账号"})})}),e(S,{span:6,children:e(h.Item,{name:"mobile",label:"手机号",children:e(I,{placeholder:"手机号"})})}),e(S,{span:6,children:e(h.Item,{name:"email",label:"邮箱",children:e(I,{placeholder:"邮箱"})})}),s(S,{span:6,style:{textAlign:"right"},children:[e(M,{onClick:t.reset,children:"重置"}),e(M,{style:{margin:"0 8px"},type:"primary",onClick:t.submit,children:"查询"})]})]})}),rt=(t,n)=>{const r=Nt(t,n),{tableProps:a}=r,l={...a.pagination,showTotal:(i,u)=>`第${u[0]}-${u[1]} 条/共 ${i} 条`,hideOnSinglePage:!0};a.pagination=l;const o=a.onChange,m=(...i)=>{var x;let[u,d,p,g]=i,v=u,k,f;Object.keys(p).length>0&&(Array.isArray(p)?(f={},p.map(b=>{var T;f[(T=b.column)==null?void 0:T.dataIndex]=b.order})):f={[(x=p.column)==null?void 0:x.dataIndex]:p.order}),Object.keys(d).length>0&&(k=d,console.log("filterrrrrrrrrrrrr",d)),o(v,k,f)};return a.onChange=m,r.tableProps.size="small",r},Hn=({state:t,refreshList:n})=>{const[r,a]=c.useState(!1),{runAsync:l,loading:o}=_(vn,{manual:!0,debounceWait:100}),m=c.useRef(null);return s(q,{children:[e(M,{icon:e(ke,{}),size:"small",onClick:()=>{a(!0),setTimeout(()=>{var u,d;(d=(u=m.current)==null?void 0:u.input)==null||d.focus()},100)},children:"编辑"}),e(Ve,{open:r,title:"更新用户信息用户",okText:"保存",cancelText:"取消",confirmLoading:o,onCancel:()=>a(!1),onOk:()=>{var u;(u=m.current)==null||u.form.validateFields().then(d=>{l({...d,id:t.id}).then(()=>{var p;a(!1),(p=m.current)==null||p.form.resetFields(),n==null||n()}).catch(tt)}).catch(d=>console.log(d))},children:e(nt,{ref:m,state:t})})]})};const $=t=>{const{children:n,className:r="",style:a={},...l}=t,{colorBgContainer:o}=de(),m="content-box",i={backgroundColor:o};return e("div",{className:`${m} ${r}`,style:{...i,...a},...l,children:n})},Kn=()=>{var x;console.log("render ExampleUserListPage");const[t]=h.useForm(),[n,r]=c.useState([]),a=c.useRef();c.useEffect(()=>{a.current=new Map},[]);const{runAsync:l,loading:o}=_(Cn,{manual:!0,debounceWait:100}),{refresh:m,tableProps:i,search:u}=rt(bn,{form:t}),d=()=>{u.reset(),u.submit()},p=b=>{var T;typeof b=="number"&&((T=a==null?void 0:a.current)==null||T.set(b,!0)),l({id:b}).then(()=>{typeof b=="object"&&r([]),m()}).finally(()=>{var y;return typeof b=="number"&&((y=a==null?void 0:a.current)==null?void 0:y.delete(b))})},g=c.useMemo(()=>[{title:"ID",dataIndex:"id"},{title:"头像",dataIndex:"avatar",render:b=>e(Ke,{src:b})},{title:"账号",dataIndex:"username"},{title:"昵称",dataIndex:"nickname"},{title:"性别",dataIndex:"gender",render:b=>b===et.male?e(we,{color:"blue",children:"男"}):e(we,{color:"error",children:"女"})},{title:"邮箱",dataIndex:"email"},{title:"手机号",dataIndex:"mobile",sorter:!0},{title:"注册时间",dataIndex:"create_time",sorter:!0},{title:"操作",key:"operation",fixed:"right",render:(b,T)=>{var C;const{id:y}=T;return s(L,{children:[e(me,{title:"确认要删除这条数据吗?",onConfirm:()=>p(y),children:e(M,{loading:(C=a==null?void 0:a.current)==null?void 0:C.has(y),icon:e(Ce,{}),size:"small",danger:!0,children:"删除"})}),e(Hn,{state:T,refreshList:m})]})}}],[]),k={selectedRowKeys:n,onChange:b=>{console.log("selectedRowKeys changed: ",b),r(b)}},f=n.length>0;return s(q,{children:[s($,{children:[e("div",{children:e(N.Title,{level:5,children:"搜索"})}),e(Bn,{search:u,form:t})]}),e("br",{}),s($,{children:[s("div",{className:"table-header",children:[e("div",{className:"left",children:e(N.Title,{level:5,children:"用户列表"})}),e("div",{className:"right",children:s(L,{size:"middle",children:[e(me,{title:`确定要删除这${n.length}条数据吗?`,onConfirm:()=>p(n),children:e(M,{type:"primary",danger:!0,disabled:!f,loading:o&&((x=a.current)==null?void 0:x.size)===0,children:"批量删除"})}),e(Rn,{refreshList:d}),e(M,{type:"link",title:"点击刷新",onClick:m,icon:e(je,{})})]})})]}),e(ve,{rowKey:"id",rowSelection:k,columns:g,...i})]})]})},De=({title:t="空白页"})=>e($,{style:{height:"500px"},children:e(N.Title,{level:4,children:t})}),_n=({search:t,form:n})=>e(h,{form:n,name:"advanced_search",style:{paddingTop:16},onFinish:a=>{console.log("Received values of form: ",a)},children:s(K,{gutter:24,children:[e(S,{span:6,children:e(h.Item,{name:"title",label:"主题",children:e(I,{placeholder:"标题"})})}),e(S,{span:6,children:e(h.Item,{name:"ahthor",label:"作者",children:e(I,{placeholder:"作者"})})}),e(S,{span:6,children:e(h.Item,{name:"create_time",label:"发布时间",children:e(wt.RangePicker,{})})}),s(S,{span:6,style:{textAlign:"right"},children:[e(M,{onClick:t.reset,children:"重置"}),e(M,{style:{margin:"0 8px"},type:"primary",onClick:t.submit,children:"查询"})]})]})});const Re=()=>{console.log("render ArticleIndexPage");const[t]=h.useForm(),n=c.useRef();z(),c.useEffect(()=>{n.current=new Map},[]);const{runAsync:r}=_(Pn,{manual:!0,debounceWait:100}),{refresh:a,tableProps:l,search:o}=rt(xn,{form:t}),m=u=>{var d;(d=n==null?void 0:n.current)==null||d.set(u,!0),r({id:u}).then(a).finally(()=>{var p;return(p=n==null?void 0:n.current)==null?void 0:p.delete(u)})},i=c.useMemo(()=>[{title:"ID",dataIndex:"id"},{title:"封面",dataIndex:"cover",render:u=>e(Lt,{width:80,height:45,style:{borderRadius:4},src:u})},{title:"标题",dataIndex:"title"},{title:"简介",dataIndex:"description"},{title:"作者",dataIndex:"author"},{title:"发布时间",dataIndex:"create_time",sorter:!0},{title:"操作",key:"operation",fixed:"right",render:(u,d)=>{var g;const{id:p}=d;return s(L,{children:[e(me,{title:"确认要删除这条数据吗?",onConfirm:()=>m(p),children:e(M,{loading:(g=n==null?void 0:n.current)==null?void 0:g.has(p),icon:e(Ce,{}),size:"small",danger:!0,children:"删除"})}),e(G,{to:`/article/update/${p}`,children:e(M,{icon:e(ke,{}),size:"small",children:"编辑"})})]})}}],[]);return s(q,{children:[s($,{children:[e("div",{children:e(N.Title,{level:5,children:"搜索"})}),e(_n,{search:o,form:t})]}),e("br",{}),s($,{children:[s("div",{className:"table-header",children:[e("div",{className:"left",children:e(N.Title,{level:5,children:"文章列表"})}),e("div",{className:"right",children:s(L,{size:"middle",children:[e(G,{to:"/article/create",children:e(M,{type:"primary",icon:e(te,{}),children:"发布文章"})}),e(M,{type:"link",title:"点击刷新",onClick:a,icon:e(je,{})})]})})]}),e(ve,{rowKey:"id",columns:i,...l})]})]})},qn=()=>{const[t]=h.useForm(),n=z(),r="articleDraft",{loading:a,run:l}=_(In,{manual:!0,debounceWait:200,onSuccess:()=>setTimeout(()=>{w.remove(r),n("/article/list")},200)}),o=w.getObject(r)||{},m=async()=>{const d=await t.validateFields();l(d)},i=()=>{const{cover:d,...p}=t.getFieldsValue();w.set(r,p),O.success("已保存到草稿箱")},u=d=>(console.log("Upload event:",d),Array.isArray(d)?d:d&&d.fileList);return s($,{children:[e(N.Title,{level:3,children:"发布文章"}),e(be,{}),e(h,{form:t,name:"createForm",labelCol:{span:3},initialValues:o,children:s(K,{gutter:36,children:[s(S,{span:16,children:[e(h.Item,{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入标题"}],children:e(I,{})}),e(h.Item,{label:"简介",name:"description",children:e(I,{})}),e(h.Item,{label:"内容",name:"content",rules:[{required:!0,message:"请输入内容"}],children:e(I.TextArea,{rows:20})}),e(h.Item,{wrapperCol:{offset:3},children:s(L,{children:[e(M,{icon:e(Ee,{}),onClick:m,loading:a,type:"primary",children:"发布文章"}),e(M,{icon:e(At,{}),onClick:i,children:"保存为草稿"})]})})]}),s(S,{span:8,children:[e(h.Item,{label:"封面",name:"cover",getValueFromEvent:u,valuePropName:"fileList",children:e(ze,{maxCount:1,listType:"picture-card",children:s("div",{children:[e(te,{}),e("div",{style:{marginTop:8},children:"选择图片"})]})})}),e(h.Item,{label:"标签",name:"tags",children:e(We,{mode:"tags",placeholder:"文章标签"})}),e(h.Item,{label:"作者",name:"author",rules:[{required:!0,message:"请输入作者"}],children:e(I,{})})]})]})})]})},Yn=()=>{const[t]=h.useForm(),n=z(),r=Ft(),{loading:a,run:l}=_(Sn,{manual:!0,debounceWait:10,onSuccess:d=>t.setFieldsValue(d)});c.useEffect(()=>{l({id:r.id})},[r.id]);const{loading:o,run:m}=_(Mn,{manual:!0,debounceWait:200,onSuccess:()=>setTimeout(()=>{n("/article/list")},200)}),i=async()=>{const d=await t.validateFields();m(d)},u=d=>(console.log("Upload event:",d),Array.isArray(d)?d:d&&d.fileList);return s($,{children:[e(N.Title,{level:3,children:"更新文章"}),e(be,{}),e(xe,{spinning:a,children:e(h,{form:t,name:"createForm",labelCol:{span:3},children:s(K,{gutter:36,children:[s(S,{span:16,children:[e(h.Item,{name:"title",label:"文章标题",rules:[{required:!0,message:"请输入标题"}],children:e(I,{})}),e(h.Item,{label:"简介",name:"description",children:e(I,{})}),e(h.Item,{label:"内容",name:"content",rules:[{required:!0,message:"请输入内容"}],children:e(I.TextArea,{rows:20})}),e(h.Item,{wrapperCol:{offset:3},children:e(L,{children:e(M,{icon:e(Ee,{}),onClick:i,loading:o,type:"primary",children:"保存"})})})]}),s(S,{span:8,children:[e(h.Item,{label:"封面",name:"cover",getValueFromEvent:u,valuePropName:"fileList",children:e(ze,{maxCount:1,listType:"picture-card",children:s("div",{children:[e(te,{}),e("div",{style:{marginTop:8},children:"选择图片"})]})})}),e(h.Item,{label:"标签",name:"tags",children:e(We,{mode:"tags",placeholder:"文章标签"})}),e(h.Item,{label:"作者",name:"author",rules:[{required:!0,message:"请输入作者"}],children:e(I,{})})]})]})})})]})},Vn=()=>{const t=ye();return s($,{style:{},children:[e(N.Title,{children:"404"}),e(N.Paragraph,{children:"页面不存在"}),s(N.Paragraph,{children:["路由: ",t.pathname]}),e(G,{to:"/",children:"回到首页"})]})};const jn=t=>{const{title:n="Iframe Page",name:r="internal-iframe"}=t,a=c.useRef(null),[l,o]=c.useState(!0),[m]=se();c.useEffect(()=>{o(!0)},[m]);const i=m.get("url"),u=()=>{o(!1)};return i?e(q,{children:e($,{style:{height:"100%",padding:0},children:e(xe,{wrapperClassName:"iframeSpin",spinning:l,tip:"正在加载第三方页面, 请稍后...",children:e("iframe",{ref:a,width:"100%",height:"100%",onLoad:u,title:n,name:r,src:i})})})}):e($,{children:e(Ut,{message:"无效的url地址",type:"error"})})};function En(){return $t([{path:"/",element:e($e,{})},{path:"/dashboard",element:e($e,{})},{path:"/user",children:[{index:!0,element:e(Oe,{})},{path:"/user/center/index",element:e(Oe,{})},{path:"/user/center/update",element:e(Dn,{})}]},{path:"/example/userList",element:e(Kn,{})},{path:"/article",children:[{index:!0,element:e(Re,{})},{path:"/article/list",element:e(Re,{})},{path:"/article/create",element:e(qn,{})},{path:"/article/update/:id",element:e(Yn,{})}]},{path:"/blank",element:e(De,{})},{path:Me,element:e(jn,{})},{path:"/multilevel/menu/2/3",element:e(De,{title:"三级菜单"})},{path:"*",element:e(Vn,{})}])}const zn=()=>e(E.Content,{className:"content",children:e(En,{})}),Wn=ee.memo(zn);const le=new Map,pe=t=>{t.map(n=>{Se(n)&&(n==null?void 0:n.type)==="url"||(ce(n)&&pe(n.children||[]),(ie(n)||Ge(n))&&(n.path&&le.set(n.path,n.label),n.children&&pe(n.children||[])))})},Jn=()=>{const{menuList:t}=c.useContext(Q),n=c.useMemo(()=>(le.clear(),pe(t),le),[t]),r=ye(),[a]=se(),l=()=>{if(r.pathname===Me){const i=a.get("url");if(i&&le.has(i))return[e(ae.Item,{children:e(G,{style:{color:"inherit"},to:Ze(i),children:n.get(i)})},i)]}return[]},o=c.useMemo(()=>{const i=r.pathname.split("/").filter(u=>u);return i.map((u,d)=>{const p=`/${i.slice(0,d+1).join("/")}`;return n.has(p)?e(ae.Item,{children:d===i.length-1?e(G,{style:{color:"inherit"},to:p,children:n.get(p)}):n.get(p)},p):null})},[r]),m=[e(ae.Item,{children:e(Ot,{})},"home"),...o,...l()];return e(ae,{className:"breadcrumb",children:m})},Gn=ee.memo(Jn);function Qn(t){const n=t.split(".")[1];if(n)try{return JSON.parse(Dt(n))}catch(r){console.warn("Parse Token Error: ",r);return}}function ge(){var r;const t=w.getString(U.tokenKey);if(!t)return!1;const n=Qn(t);return n!==void 0&&((r=n==null?void 0:n.data)==null?void 0:r.uid)>0&&n.exp>new Date().getTime()/1e3}const Xn=({loading:t,title:n})=>{const{settings:{theme:r}}=c.useContext(V);return e(xe,{size:"large",spinning:t,tip:n,wrapperClassName:`page-loading-spin-${r}`,children:e("div",{style:{height:"100vh",width:"100vw"}})})};const Zn=()=>{const[t,n]=Je.useNotification(),r=w.getBoolean("dontShowCompactModeNotify"),{setSetting:a,settings:{compactMode:l}}=c.useContext(V),o=()=>{const m=`open${Date.now()}`,i=s(L,{children:[e(M,{type:"link",size:"small",onClick:()=>t.destroy(),children:"不再提示"}),e(M,{type:"primary",size:"small",onClick:()=>{a({compactMode:!0}),t.destroy(m)},children:"开启"})]});t.info({message:"开启紧凑布局模式",description:"检测到您的屏幕尺寸过小, 是否开启紧凑布局模式? 或者您也可以选择在设置中手动开启",btn:i,key:m,onClose:()=>w.set("dontShowCompactModeNotify",!0)})};return c.useEffect(()=>{!r&&!l&&window.innerWidth<=1440&&o()},[]),n},er=()=>{const{settings:{showFooter:t}}=c.useContext(V),{Text:n,Link:r}=N;return t?s(E.Footer,{style:{textAlign:"center",paddingBottom:4},children:[s(n,{type:"secondary",children:["React Admin Template",e(r,{href:"https://github.com/xstnet/react-admin-template",target:"_blank",style:{color:"inherit",marginLeft:5},children:e(Rt,{})})]}),e("br",{}),e(r,{href:"https://github.com/xstnet",target:"_blank",children:e(n,{type:"secondary",children:"醉丶春风"})}),e(n,{type:"secondary",children:"©2023 Created by Ant Design V5"})]}):null},tr=()=>{const[t,n]=c.useState(!0),{setIsLogin:r,setUserInfo:a}=c.useContext(Ie),{menuCollapsed:l}=c.useContext(Q),{colorBgContainer:o}=de(),{settings:{fixedMenu:m,fixedHeader:i}}=c.useContext(V),u=z(),[d]=se();return console.log("default layout render..."),c.useEffect(()=>{if(!ge()){u("/login");return}fn().then(p=>{if(n(!1),r(!0),a(p),d.has("ghpage")){const g=decodeURIComponent(d.get("ghpage"));u(g);return}}).catch(p=>{p instanceof Bt&&Je.error({message:"网络错误",description:"获取用户信息失败, 无法打开页面",duration:null,closeIcon:null})})},[]),ge()?t?e(Xn,{title:"页面加载中",loading:t}):s(E,{"data-fixed-menu":m?1:0,"data-menu-collapsed":l?1:0,"data-fixed-header":i?1:0,style:{background:o},className:"default-layout",children:[e(An,{}),s(E,{children:[e(dn,{}),s(E,{className:"content-layout",children:[e(Gn,{}),e(Wn,{}),e(er,{})]})]}),e(Zn,{})]}):(u("/login"),null)};const nr=()=>{const t=z(),{loading:n,run:r}=_(gn,{manual:!0,debounceWait:300,onSuccess:o=>{w.setToken(o.token),t("/dashboard")}});document.title=U.pageTitle;const a=o=>{r(o)};c.useEffect(()=>{ge()&&t("/dashboard")},[]);const l={remember:!0,username:"admin",password:"123456"};return e(q,{children:s(He,{theme:{algorithm:[B.defaultAlgorithm]},children:[e("div",{className:"bg-wrap"}),s(K,{className:"login-wrap",children:[e(S,{span:15,className:"login-banner"}),s(S,{span:9,className:"login-form-wrap",children:[e(N.Title,{style:{textAlign:"center"},children:"后台管理系统"}),e("br",{}),s(h,{name:"loginForm",labelCol:{span:5},wrapperCol:{span:19},style:{maxWidth:600},initialValues:l,onFinish:a,autoComplete:"off",children:[e(h.Item,{label:"用户名",name:"username",rules:[{required:!0,message:"请输入用户名!"}],children:e(I,{placeholder:"admin"})}),e(h.Item,{label:"密码",name:"password",rules:[{required:!0,message:"请输入密码!"}],children:e(I.Password,{placeholder:"123456"})}),e(h.Item,{name:"remember",valuePropName:"checked",wrapperCol:{offset:5},children:e(_e,{children:"记住我"})}),e(h.Item,{wrapperCol:{offset:5,span:16},children:e(M,{loading:n,type:"primary",htmlType:"submit",children:"登录"})})]})]})]})]})})};function rr(){return c.useEffect(()=>{},[]),e(ln,{children:e("div",{className:"App",children:s(Ht,{children:[e(Le,{element:e(nr,{}),path:"/login"}),e(Le,{path:"*",element:e(tr,{})})]})})})}function Be(t){const n=JSON.stringify({type:"JWT",alg:"HS256"}),r=Number((new Date().getTime()/1e3).toFixed(0)),a=JSON.stringify({iss:"github.com/xstnet",sub:"react-admin",iat:r,exp:r+86400*14,data:t}),l="H_97UyQUOmURnZdDwI0khuAt4Cmg";return`${Ae(n)}.${Ae(a)}.${l}`}P.mock(/api\/login/,"post",({body:t})=>{const{username:n,password:r}=JSON.parse(t);return n==="admin"?r!=="123456"?{code:-1,message:"密码错误"}:{code:0,message:"登录成功",data:{token:Be({uid:1})}}:{code:0,message:"登录成功",data:{token:Be({uid:W.Random.natural(2,1e4)})}}});P.setup({timeout:100});P.mock(/api\/user\/info/,"get",t=>({code:0,message:"ok",data:{id:1,username:"admin",nickname:"醉丶春风",avatar:"https://www.xstnet.com/static/images/head.gif",password:"",gender:W.Random.natural(1,2),email:"shantongxu@qq.com",mobile:"133xxxx3333"}}));P.mock(/api\/user\/logout/,"post",t=>({code:0,message:"退出成功"}));P.mock(/api\/user\/list/,"get",t=>{const n=new URLSearchParams(t.url);let r=Number(n.has("pageSize")?n.get("pageSize"):10);const a={code:0,message:"ok",data:{total:100,[`list|${r}`]:[{"id|+1":r,username:"@first@last",nickname:"@cname",avatar:()=>W.Random.dataImage("200x200"),email:"@email",mobile:()=>P.mock(/^1[3456789]\d{9}$/).replace(/^(\d{3})\d{4}(\d{4})$/,"$1****$2"),"gender|1-2":0,create_time:"@date(yyyy-MM-dd HH:MM:ss)"}]}};return P.mock(a)});P.mock(/api\/user\/create/,"post",t=>({code:0,message:"创建成功",data:{id:W.Random.natural(100,9999)}}));P.mock(/api\/user\/update/,"post",t=>({code:0,message:"更新成功"}));P.mock(/api\/user\/delete/,"post",t=>({code:0,message:"删除成功"}));P.setup({timeout:100});P.mock(/api\/article\/detail/,"get",t=>(console.log("🚀 ~ file: article.ts:7 ~ Mock.mock ~ options:",t),{code:0,message:"ok",data:{id:1,title:"主题",description:"醉丶春风",author:"醉丶春风",tags:[1,2],content:"content",create_time:W.Random.datetime()}}));P.mock(/api\/article\/list/,"get",t=>{const n=new URLSearchParams(t.url);let r=Number(n.has("pageSize")?n.get("pageSize"):10);const a={code:0,message:"ok",data:{total:100,[`list|${r}`]:[{"id|+1":r,author:"@first@last",title:()=>P.Random.ctitle(5,20),description:"@cname",cover:()=>W.Random.dataImage("480x270","封面"),content:"@email",create_time:"@date(yyyy-MM-dd HH:MM:ss)"}]}};return P.mock(a)});P.mock(/api\/article\/create/,"post",t=>({code:0,message:"创建成功",data:{id:W.Random.natural(100,9999)}}));P.mock(/api\/article\/update/,"post",t=>({code:0,message:"更新成功"}));P.mock(/api\/article\/delete/,"post",t=>({code:0,message:"删除成功"}));Kt.createRoot(document.getElementById("root")).render(e(_t,{basename:"/react-admin-template/",children:e(rr,{})}));
