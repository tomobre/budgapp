(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{98:function(e,t,a){},99:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),o=a(23),r=a.n(o),c=a(17),i=a(9),l=a(8),d=a(4),u=a(1),m=n.a.createContext(),j=function(e){var t=n.a.useState({id:"",message:""}),a=Object(d.a)(t,2),s=a[0],o=a[1],r=n.a.useState(""),c=Object(d.a)(r,2),i=c[0],l=c[1],j=n.a.useState(""),b=Object(d.a)(j,2),p=b[0],g=b[1],h=n.a.useState(""),O=Object(d.a)(h,2),x=O[0],f=O[1],v=n.a.useState(""),N=Object(d.a)(v,2),y=N[0],I=N[1],S=n.a.useState(!1),C=Object(d.a)(S,2),E=C[0],A=C[1],R=n.a.useState(""),T=Object(d.a)(R,2),k=T[0],w=T[1],L=n.a.useState(""),G=Object(d.a)(L,2),q=G[0],D=G[1];return Object(u.jsx)(m.Provider,{value:{modalKey:[E,A],modifyOkKey:[s,o],modifyConceptKey:[i,l],modifyAmountKey:[p,g],modifyDateKey:[x,f],typeKey:[y,I],responseModifiedKey:[k,w],modifyCategoryKey:[q,D]},children:e.children})},b=a(34),p=a(60),g=i.a.img.withConfig({displayName:"NavBar__Img",componentId:"sc-1re0kan-0"})(["margin-left:1rem;cursor:pointer;padding-bottom:1rem;"]),h=i.a.div.withConfig({displayName:"NavBar__Acount",componentId:"sc-1re0kan-1"})(["position:absolute;right:0;color:#3d81ff;display:flex;justify-content:right;align-items:center;"]);var O=function(){var e=n.a.useState(localStorage.getItem("user")),t=Object(d.a)(e,2),a=t[0],s=t[1];return Object(u.jsx)("div",{children:Object(u.jsxs)(b.a,{collapseOnSelect:!0,expand:"lg",className:"mb-5 ",bg:"light",variant:"light",children:[Object(u.jsx)(b.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(u.jsx)(b.a.Collapse,{id:"responsive-navbar-nav",children:Object(u.jsxs)(p.a,{className:"mr-5 ",children:[Object(u.jsx)(c.c,{className:"mr-5 text-decoration-none",to:"/",children:"Inicio"}),Object(u.jsx)(c.c,{className:" mr-5 text-decoration-none",to:"/login",children:"Ingresar"}),Object(u.jsx)(c.c,{className:" mr-5 text-decoration-none",to:"/register",children:"Registrarse"}),Object(u.jsx)(c.c,{className:" mr-5 text-decoration-none",to:"/newdata",children:"Agregar Operaci\xf3n"}),Object(u.jsx)(c.c,{className:" mr-5 text-decoration-none",to:"/categories",children:"Categorias"}),null!==a&&Object(u.jsxs)(h,{children:[Object(u.jsx)("p",{children:a.toUpperCase()}),Object(u.jsx)(g,{alt:"Log Out",onClick:function(){localStorage.removeItem("token"),localStorage.removeItem("user"),window.location.reload(),s(null)},src:"https://icongr.am/feather/log-out.svg?size=20&color=3d81ff"})]})]})})]})})},x=a(13),f=a.n(x),v=a(42),N=a.n(v),y=a(21),I=a(7),S=a(20);N.a.setAppElement("#root");var C={content:{borderRadius:"0.375rem",boxShadow:"0 5px 10px 0 rgba(0, 0, 0, 0.15)",padding:"3rem",marginBottom:"3rem",top:"50%",left:"50%",right:"auto",bottom:"auto",transform:"translate(-50%, -50%)",marginLeft:"2vw",marginRightt:"2vh"},overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backdropFilter:"blur(2px)"},button:{backgroundColor:"transparent",border:"none",position:"absolute",right:"4%",top:"2%"}};var E=function(){var e=n.a.useContext(m),t=e.modifyOkKey,a=e.responseModifiedKey,s=e.modalKey,o=e.modifyConceptKey,r=e.modifyAmountKey,c=e.modifyDateKey,i=e.typeKey,l=e.modifyCategoryKey,j=Object(d.a)(t,2),b=j[0],p=j[1],g=Object(d.a)(a,2),h=(g[0],g[1]),O=Object(d.a)(o,2),x=O[0],v=O[1],E=Object(d.a)(r,2),A=E[0],R=E[1],T=Object(d.a)(c,2),k=T[0],w=T[1],L=Object(d.a)(i,2),G=L[0],q=(L[1],Object(d.a)(l,2)),D=q[0],K=q[1],U=Object(d.a)(s,2),_=U[0],M=U[1],P=Object(y.a)(),V=P.register,F=P.handleSubmit,z=P.errors,B=function(e){p({id:"",message:""}),M(!1);var t={concept:x,amount:parseInt(A,10),date:k,category:D};f.a.put("https://budgapp-back.herokuapp.com/update/".concat(parseInt(b.id,10)),t).then((function(){h("Se ha modificado la operacion con exito"),setTimeout((function(){h("")}),5e3)})).catch((function(e){h("Hubo un error ".concat(e.response.status?e.response.status:503," al modificar la operacion: ").concat(e.response.data[0].msg?e.response.data[0].msg:e.response?e.response.data:e," ")),setTimeout((function(){h("")}),5e3)}))};return Object(u.jsxs)(N.a,{onRequestClose:function(){M(!1)},style:C,isOpen:_,children:[Object(u.jsx)("button",{style:C.button,onClick:function(){return M(!1)},children:"x"}),Object(u.jsxs)(I.a,{onKeyUp:function(e){13===e.keyCode&&F(B)()},children:[Object(u.jsx)("h3",{className:"mb-5 text-center",children:"MODIFICAR OPERACI\xd3N"}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:V({required:{value:!0,message:"La fecha es requerida"}}),value:k,onChange:function(e){w(e.target.value)},name:"date",placeholder:"fecha",type:"date"})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:V({required:{value:!0,message:"El concepto de la operacion  es requerido"},maxLength:{value:50,message:"El concepto no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"El concepto debe tener como minimo  4 caracteres"}}),value:x,name:"concept",placeholder:"concepto",type:"text",onChange:function(e){v(e.target.value)}})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:V({required:{value:!0,message:"El monto a cargar es requerido"},min:{value:1,message:"Monto no valido"},max:{value:1e6,message:"Monto mayor a un millon no valido"}}),value:A,name:"amount",placeholder:"monto",onChange:function(e){R(e.target.value)},type:"number"})}),"INGRESO"===G?Object(u.jsx)("div",{children:Object(u.jsx)(I.a.Group,{children:Object(u.jsxs)(I.a.Control,{as:"select",onChange:function(e){return K(e.target.value)},children:[Object(u.jsx)("option",{defaultValue:!0,value:D,children:D}),Object(u.jsx)("option",{value:"FIJO",children:"FIJO"}),Object(u.jsx)("option",{value:"VARIABLE",children:"VARIABLE"}),Object(u.jsx)("option",{value:"EXTRAORDINARIO",children:"EXTRAORDINARIO"})]})})},"1813"):Object(u.jsx)("div",{children:Object(u.jsx)(I.a.Group,{children:Object(u.jsxs)(I.a.Control,{as:"select",name:"category",onChange:function(e){return K(e.target.value)},children:[Object(u.jsx)("option",{defaultValue:!0,value:D,children:D}),Object(u.jsx)("option",{value:"ALIMENTACION",children:"ALIMENTACION"}),Object(u.jsx)("option",{value:"CUENTA Y PAGOS",children:"CUENTA Y PAGOS"}),Object(u.jsx)("option",{value:"CASA",children:"CASA"}),Object(u.jsx)("option",{value:"TRANSPORTE",children:"TRANSPORTE"}),Object(u.jsx)("option",{value:"SALUD E HIGIENE",children:"SALUD E HIGIENE"}),Object(u.jsx)("option",{value:"DIVERSION",children:"DIVERSION"}),Object(u.jsx)("option",{value:"OTROS",children:"OTROS"})]})})},"1513"),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:z.date&&z.date.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:z.amount&&z.amount.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:z.concept&&z.concept.message}),Object(u.jsx)("div",{className:" mt-5 mb-2 d-flex justify-content-center",children:Object(u.jsx)(S.a,{onClick:F(B),variant:"primary",children:"Modificar"})})]})]})},A=(a(97),a(59)),R=i.a.td.withConfig({displayName:"Home__Total",componentId:"vohi73-0"})(["font-weight:700;"]),T=i.a.img.withConfig({displayName:"Home__Img",componentId:"vohi73-1"})(["cursor:pointer;"]);var k=function(){var e=Object(s.useContext)(m),t=e.modifyOkKey,a=e.responseModifiedKey,o=e.modalKey,r=e.modifyConceptKey,c=e.modifyAmountKey,i=e.modifyDateKey,l=e.typeKey,j=e.modifyCategoryKey,b=Object(d.a)(t,2),p=b[0],g=b[1],h=Object(d.a)(a,2),O=h[0],x=h[1],v=Object(d.a)(r,2),N=(v[0],v[1]),y=Object(d.a)(c,2),S=(y[0],y[1]),C=Object(d.a)(i,2),k=(C[0],C[1]),w=Object(d.a)(l,2),L=(w[0],w[1]),G=Object(d.a)(j,2),q=(G[0],G[1]),D=Object(d.a)(o,2),K=D[0],U=D[1],_=n.a.useState([]),M=Object(d.a)(_,2),P=M[0],V=M[1],F=n.a.useState(0),z=Object(d.a)(F,2),B=z[0],H=z[1],J=n.a.useState("TODAS"),X=Object(d.a)(J,2),Y=X[0],W=X[1],Q=n.a.useState({beg:0,end:10}),$=Object(d.a)(Q,2),Z=$[0],ee=$[1],te=n.a.useState({state:!0,message:"Cargando..."}),ae=Object(d.a)(te,2),se=ae[0],ne=ae[1];n.a.useEffect((function(){var e=localStorage.getItem("token"),t=!0;return e?f.a.get("https://budgapp-back.herokuapp.com/user/auth",{headers:{"x-access-token":localStorage.getItem("token")}}).then((function(e){var a=localStorage.getItem("user");f.a.get("https://budgapp-back.herokuapp.com/operations/".concat(a)).then((function(e){if(t)if(V(e.data),P.length){ne({state:!1,message:""});var a=P.filter((function(e){return"INGRESO"===e.type})),s=P.filter((function(e){return"EGRESO"===e.type}));if(a.length&&s.length){var n=a.reduce((function(e,t){return{amount:e.amount+t.amount}})),o=s.reduce((function(e,t){return{amount:e.amount+t.amount}}));H(n.amount-o.amount)}else if(a.length){var r=a.reduce((function(e,t){return{amount:e.amount+t.amount}}));H(r.amount)}else if(s.length){var c=s.reduce((function(e,t){return{amount:e.amount+t.amount}}));H(0-c.amount)}}else t&&setTimeout((function(){ne({state:!0,message:"No hay operaciones registradas con el usuario"})}),5e3)})).catch((function(e){ne({state:!0,message:"Ocurrio un error ".concat(e.response?e.response.status:503," al traer la informacion: ").concat(e.response?e.response.data:e)})}))})).catch((function(e){localStorage.removeItem("user"),localStorage.removeItem("token"),ne({state:!0,message:"Ocurrio un error ".concat(e.response?e.response.status:503," con la cuenta del usuario: ").concat(e.response?e.response.data:e)}),function(){var e=new Date(performance.timing.domLoading).getTime();Date.now()>e+1e4&&window.location.reload()}()})):ne({state:!0,message:"Budg App es una plataforma para manejar sus propios ingresos o egresos economicos. Registrese o ingrese para comenzar con su uso."}),function(){t=!1}}),[P,B]);var oe=function(e){U(!0),g({id:e.target.id,message:"Cargando..."}),f.a.get("https://budgapp-back.herokuapp.com/operations/user/".concat(e.target.id)).then((function(t){g({id:e.target.id,message:""}),N(t.data[0].concept),S(t.data[0].amount),k(t.data[0].date.slice(0,10)),L(t.data[0].type),q(t.data[0].category)})).catch((function(t){g({id:e.target.id,message:"Ocurrio un error ".concat(t.response?t.response.status:503," al cargar el contenido: ").concat(t.response?t.response.data:t)}),setTimeout((function(){g({id:"",message:""})}),5e3)}))},re=function(e){window.confirm("\xbfEsta seguro que desea eliminar la operaci\xf3n?")&&f.a.delete("https://budgapp-back.herokuapp.com/delete/".concat(e.target.id)).then((function(){x("Se elimin\xf3 la operacion con exito"),setTimeout((function(){x("")}),5e3)})).catch((function(e){console.log(e),x("Hubo un error ".concat(e.response.status?e.response.status:503," al intentar eliminar la operacion: ").concat(e.response?e.response.data:e," ")),setTimeout((function(){x("")}),5e3)}))};return se.state?Object(u.jsx)("p",{className:"text-center mt-5 mb-5",children:se.message}):Object(u.jsxs)("div",{children:[Object(u.jsx)("h3",{className:"text-center mt-5 mb-5",children:O}),Object(u.jsx)("h3",{className:"text-center mt-5 mb-5",children:p.message}),Object(u.jsxs)(A.a,{className:"mb-5",responsive:!0,striped:!0,bordered:!0,hover:!0,children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"Fecha"}),Object(u.jsx)("th",{children:"Concepto"}),Object(u.jsx)("th",{children:"Tipo"}),Object(u.jsx)("th",{children:"Monto"}),Object(u.jsxs)("th",{className:"text-center ",children:["Categoria",Object(u.jsxs)(I.a.Control,{className:"mt-3",as:"select",onChange:function(e){W(e.target.value),ee({beg:0,end:10})},children:[Object(u.jsx)("option",{defaultValue:!0,value:"TODAS",children:"TODAS"}),Object(u.jsx)("option",{value:"FIJO",children:"FIJO"}),Object(u.jsx)("option",{value:"VARIABLE",children:"VARIABLE"}),Object(u.jsx)("option",{value:"EXTRAORDINARIO",children:"EXTRAORDINARIO"}),Object(u.jsx)("option",{value:"ALIMENTACION",children:"ALIMENTACION"}),Object(u.jsx)("option",{value:"CUENTA Y PAGOS",children:"CUENTA Y PAGOS"}),Object(u.jsx)("option",{value:"CASA",children:"CASA"}),Object(u.jsx)("option",{value:"TRANSPORTE",children:"TRANSPORTE"}),Object(u.jsx)("option",{value:"SALUD E HIGIENE",children:"SALUD E HIGIENE"}),Object(u.jsx)("option",{value:"DIVERSION",children:"DIVERSION"}),Object(u.jsx)("option",{value:"OTROS",children:"OTROS"})]})]})]})}),Object(u.jsxs)("tbody",{children:[P.length&&P.filter((function(e){return"TODAS"===Y?e.category:e.category===Y})).slice(Z.beg,Z.end).map((function(e){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:new Date(e.date).toLocaleDateString("es-AR",{timeZone:"UTC"})}),Object(u.jsx)("td",{children:e.concept}),Object(u.jsx)("td",{children:e.type}),Object(u.jsxs)("td",{children:[e.amount.toLocaleString("es")," $"]}),Object(u.jsxs)("td",{children:[e.category," "]}),Object(u.jsxs)("td",{children:[Object(u.jsx)(T,{className:"mr-3",id:e.id,alt:"Modificar",onClick:oe,src:"https://icongr.am/entypo/new-message.svg?size=25&color=0038e0"}),Object(u.jsx)(T,{id:e.id,alt:"Eliminar",onClick:re,src:"https://icongr.am/jam/trash-alt.svg?size=26&color=ff0000"})]})]},e.id)})),Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{colSpan:"2"}),Object(u.jsx)(R,{children:"TOTAL"}),Object(u.jsxs)(R,{children:[B.toLocaleString("es")," $"]})]})]})]}),Object(u.jsxs)("div",{className:"d-flex flex-row justify-content-center mt-1 mb-4",children:[Z.beg>0&&Object(u.jsx)("div",{className:"mx-2 ",children:Object(u.jsx)(T,{alt:"previous",src:"https://icongr.am/jam/chevrons-circle-left-f.svg?size=30&color=699dfb",onClick:function(){ee({beg:Z.beg-10,end:Z.end-10})}})}),Z.end<P.filter((function(e){return"TODAS"===Y?e.category:e.category===Y})).length&&Object(u.jsx)("div",{children:Object(u.jsx)(T,{alt:"next",src:"https://icongr.am/jam/chevrons-circle-right-f.svg?size=30&color=699dfb",onClick:function(){ee({beg:Z.beg+10,end:Z.end+10})}})})]}),K&&""===p.message&&Object(u.jsx)(E,{})]})},w=i.a.div.withConfig({displayName:"NewData__Wrapper",componentId:"s2ij9m-0"})(["background-color:white;border-radius:0.375rem;box-shadow:0 5px 10px 0 rgba(0,0,0,0.15);padding:3rem;margin-bottom:2rem;"]);var L=function(){var e=n.a.useState(""),t=Object(d.a)(e,2),a=t[0],s=t[1],o=n.a.useState(""),r=Object(d.a)(o,2),c=r[0],i=r[1],l=n.a.useState(""),m=Object(d.a)(l,2),j=m[0],b=m[1],p=n.a.useState("INGRESO"),g=Object(d.a)(p,2),h=g[0],O=g[1],x=n.a.useState("FIJO"),v=Object(d.a)(x,2),N=v[0],C=v[1],E=n.a.useState({state:!1,message:""}),A=Object(d.a)(E,2),R=A[0],T=A[1],k=n.a.useRef(void 0),L=Object(y.a)(),G=L.register,q=L.handleSubmit,D=L.errors;n.a.useEffect((function(){return function(){void 0!==k.current&&clearTimeout(k.current)}}),[]);var K=function(){var e=localStorage.getItem("user");if(e){T({state:!0,message:"Cargando..."});var t={concept:a,amount:parseInt(c,10),date:j,type:h,user:e,category:N};f.a.post("https://budgapp-back.herokuapp.com/add",t).then((function(e){s(""),i(""),b(""),T({state:!0,message:"Se ha a\xf1adido la nueva operacion con exito"}),k.current=setTimeout((function(){T({state:!1,message:""})}),5e3)})).catch((function(e){T({state:!0,message:"Ocurrio un error ".concat(e.response?e.response.status:503," al registrarse: ").concat(e.response?e.response.data[0].msg:e)}),setTimeout((function(){T({state:!1,message:""})}),5e3)}))}else T({state:!0,message:"No se ha ingresado a una cuenta"}),setTimeout((function(){T({state:!1,message:""})}),5e3)};return Object(u.jsxs)("div",{children:[R.state&&Object(u.jsx)("h3",{className:"text-center mt-5 mb-5",children:R.message}),Object(u.jsxs)(w,{className:"container",children:[Object(u.jsx)("h3",{className:"mb-5 text-center",children:"NUEVA OPERACI\xd3N"}),Object(u.jsxs)(I.a,{onKeyUp:function(e){13===e.keyCode&&q(K)()},children:[Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:G({required:{value:!0,message:"La fecha es requerida"}}),name:"date",type:"date",placeholder:"fecha",value:j,onChange:function(e){return b(e.target.value)}})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:G({required:{value:!0,message:"El concepto de la operacion  es requerido"},maxLength:{value:50,message:"El concepto no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"El concepto debe tener como minimo  4 caracteres"}}),name:"concept",placeholder:"Concepto",value:a,onChange:function(e){return s(e.target.value)},type:"text"})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:G({required:{value:!0,message:"El monto a cargar es requerido"},min:{value:1,message:"Monto no valido"},max:{value:1e6,message:"Monto mayor a un millon no valido"}}),name:"amount",type:"number",placeholder:"Monto",value:c,onChange:function(e){return i(e.target.value)}})}),Object(u.jsx)("div",{children:Object(u.jsx)(I.a.Group,{children:Object(u.jsxs)(I.a.Control,{as:"select",onChange:function(e){O(e.target.value),C("INGRESO"===e.target.value?"FIJO":"ALIMENTACION")},children:[Object(u.jsx)("option",{value:"INGRESO",children:"INGRESO"}),Object(u.jsx)("option",{value:"EGRESO",children:"EGRESO"})]})})},"1456"),"INGRESO"===h?Object(u.jsx)("div",{children:Object(u.jsx)(I.a.Group,{controlId:"exampleForm.ControlSelect1",children:Object(u.jsxs)(I.a.Control,{as:"select",onChange:function(e){return C(e.target.value)},children:[Object(u.jsxs)("option",{defaultValue:!0,value:"FIJO",children:["FIJO"," "]}),Object(u.jsx)("option",{value:"VARIABLE",children:"VARIABLE"}),Object(u.jsx)("option",{value:"EXTRAORDINARIO",children:"EXTRAORDINARIO"})]})})},"181"):Object(u.jsx)("div",{children:Object(u.jsx)(I.a.Group,{children:Object(u.jsxs)(I.a.Control,{as:"select",onChange:function(e){return C(e.target.value)},children:[Object(u.jsxs)("option",{defaultValue:!0,value:"ALIMENTACION",children:[" ","ALIMENTACION"]}),Object(u.jsx)("option",{value:"CUENTA Y PAGOS",children:"CUENTA Y PAGOS"}),Object(u.jsx)("option",{value:"CASA",children:"CASA"}),Object(u.jsx)("option",{value:"TRANSPORTE",children:"TRANSPORTE"}),Object(u.jsx)("option",{value:"SALUD E HIGIENE",children:"SALUD E HIGIENE"}),Object(u.jsx)("option",{value:"DIVERSION",children:"DIVERSION"}),Object(u.jsx)("option",{value:"OTROS",children:"OTROS"})]})})},"1813"),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:D.date&&D.date.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:D.amount&&D.amount.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:D.concept&&D.concept.message}),Object(u.jsx)("div",{className:" mt-5 mb-2 d-flex justify-content-center",children:Object(u.jsx)(S.a,{onClick:q(K),variant:"primary",children:"Enviar"})})]})]})]})},G=i.a.div.withConfig({displayName:"Register__Wrapper",componentId:"sc-1jjzrwq-0"})(["background-color:white;border-radius:0.375rem;box-shadow:0 5px 10px 0 rgba(0,0,0,0.15);padding:3rem;margin-bottom:2rem;"]);var q=function(){var e=n.a.useState(""),t=Object(d.a)(e,2),a=t[0],s=t[1],o=n.a.useState(""),r=Object(d.a)(o,2),c=r[0],i=r[1],l=n.a.useState({state:!1,message:""}),m=Object(d.a)(l,2),j=m[0],b=m[1],p=Object(y.a)(),g=p.register,h=p.handleSubmit,O=p.errors,x=function(){b({state:!0,message:"Cargando..."}),f.a.post("https://budgapp-back.herokuapp.com/register",{user:a,password:c}).then((function(e){b({state:!0,message:"Se ha registrado con exito"}),setTimeout((function(){b({state:!1,message:""})}),5e3)})).catch((function(e){b({state:!0,message:"Ocurrio un error ".concat(e.response?e.response.status:503," al registrarse: ").concat(e.response?e.response.data:e)}),setTimeout((function(){b({state:!1,message:""})}),5e3)}))};return Object(u.jsxs)("div",{children:[j.state&&Object(u.jsx)("h3",{className:"text-center mt-5 mb-5",children:j.message}),Object(u.jsxs)(G,{className:"container",children:[Object(u.jsx)("h3",{className:"mb-5 text-center",children:"REGISTRO"}),Object(u.jsxs)(I.a,{onKeyUp:function(e){13===e.keyCode&&h(x)()},children:[Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:g({required:{value:!0,message:"El usuario es requerido"},maxLength:{value:50,message:"El usuario/email no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"El usuario/email debe tener como minimo  4 caracteres"}}),name:"user",type:"text",placeholder:"Usuario/Email",value:a,onChange:function(e){return s(e.target.value)}})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:g({required:{value:!0,message:"La contrase\xf1a  es requerida"},maxLength:{value:50,message:"La contrase\xf1a no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"La contrase\xf1a debe tener como minimo  4 caracteres"}}),name:"password",placeholder:"Contrase\xf1a",value:c,onChange:function(e){return i(e.target.value)},type:"password"})}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:O.user&&O.user.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:O.password&&O.password.message}),Object(u.jsx)("div",{className:" mt-5 mb-2 d-flex justify-content-center",children:Object(u.jsx)(S.a,{onClick:h(x),variant:"primary",children:"Enviar"})})]})]})]})},D=i.a.div.withConfig({displayName:"Login__Wrapper",componentId:"adr43s-0"})(["background-color:white;border-radius:0.375rem;box-shadow:0 5px 10px 0 rgba(0,0,0,0.15);padding:3rem;margin-bottom:2rem;"]);var K=function(){var e=n.a.useState(""),t=Object(d.a)(e,2),a=t[0],s=t[1],o=n.a.useState(""),r=Object(d.a)(o,2),c=r[0],i=r[1],l=n.a.useState({state:!1,message:""}),m=Object(d.a)(l,2),j=m[0],b=m[1],p=Object(y.a)(),g=p.register,h=p.handleSubmit,O=p.errors,x=function(){localStorage.getItem("token")?(b({state:!0,message:"Para poder ingresar debe salir de su cuenta actual"}),setTimeout((function(){b({state:!1,message:""})}),4e3)):(b({state:!0,message:"Cargando..."}),f.a.post("https://budgapp-back.herokuapp.com/login",{user:a,password:c}).then((function(e){e.data.auth?(b({state:!0,message:"Se ingreso con exito a la cuenta"}),localStorage.setItem("token",e.data.token),localStorage.setItem("user",e.data.user),setTimeout((function(){window.location.reload()}),3e3)):(b({state:!0,message:"Usuario o contrase\xf1a incorrecto"}),setTimeout((function(){b({state:!1,message:""})}),5e3))})).catch((function(e){b({state:!0,message:"Ocurrio un error ".concat(e.response?e.response.status:503," al registrarse: ").concat(e.response?e.response.data[0].msg:e)}),setTimeout((function(){b({state:!1,message:""})}),5e3)})))};return Object(u.jsxs)("div",{children:[j.state&&Object(u.jsx)("h3",{className:"text-center mt-5 mb-5",children:j.message}),Object(u.jsxs)(D,{className:"container",children:[Object(u.jsx)("h3",{className:"mb-5 text-center",children:"INGRESAR"}),Object(u.jsxs)(I.a,{onKeyUp:function(e){13===e.keyCode&&h(x)()},children:[Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:g({required:{value:!0,message:"El usuario es requerido"},maxLength:{value:50,message:"El usuario/email no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"El usuario/email debe tener como minimo  4 caracteres"}}),name:"user",type:"text",placeholder:"Usuario/Email",value:a,onChange:function(e){return s(e.target.value)}})}),Object(u.jsx)(I.a.Group,{children:Object(u.jsx)(I.a.Control,{ref:g({required:{value:!0,message:"La contrase\xf1a  es requerida"},maxLength:{value:50,message:"La contrase\xf1a no debe tener  m\xe1s de 50 caracteres"},minLength:{value:4,message:"La contrase\xf1a debe tener como minimo  4 caracteres"}}),name:"password",placeholder:"Contrase\xf1a",value:c,onChange:function(e){return i(e.target.value)},type:"password"})}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:O.user&&O.user.message}),Object(u.jsx)("span",{className:"text-danger text-small d-block mb-2",children:O.password&&O.password.message}),Object(u.jsx)("div",{className:" mt-5 mb-2 d-flex justify-content-center",children:Object(u.jsx)(S.a,{onClick:h(x),variant:"primary",children:"Enviar"})})]})]})]})},U=i.a.div.withConfig({displayName:"Categories__Wrapper",componentId:"sc-8mr652-0"})(["background-color:white;border-radius:0.375rem;box-shadow:0 5px 10px 0 rgba(0,0,0,0.15);padding:3rem;margin-bottom:2rem;"]);var _=function(){return Object(u.jsxs)(U,{children:[Object(u.jsx)("h3",{className:"mb-5 text-center",children:" \xbfQue significa cada categoria?"}),Object(u.jsx)("p",{children:"Los ingresos los podemos dividir en tres categor\xedas:"}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"Ingresos fijos: son aquellos que recibimos de forma regular, como son: las n\xf3minas, los subsidios, las pensiones, alquileres. Los ingresos fijos son muy f\xe1ciles de controlar, pues lo normal es recibirlos en nuestra cuenta bancaria, por lo que nos ser\xe1 muy f\xe1cil de consultar en cualquier momento."}),Object(u.jsx)("li",{children:"Ingresos variables: son aquellos que no son recurrentes de forma peri\xf3dica, como por ejemplo: si cobramos incentivos o comisiones por ventas, facturas emitidas en caso de aut\xf3nomos o si realizamos trabajos puntuales."}),Object(u.jsx)("li",{children:"Ingresos extraordinarios: son aquellos que no estaban previstos y que ocurren de forma extraordinaria, como por ejemplo el cobro de una herencia o un boleto premiado de loter\xeda."})]}),Object(u.jsx)("br",{}),Object(u.jsx)("p",{children:"Por otro lado tenemos los egresos, es decir los gastos que se van a generar de manera periodica. Entre estos encontramos:"}),Object(u.jsxs)("ul",{children:[Object(u.jsx)("li",{children:"Alimentaci\xf3n. "}),Object(u.jsx)("li",{children:"Cuentas y pagos: los gastos de energ\xeda, tel\xe9fono, Internet, agua."}),Object(u.jsx)("li",{children:"Casa: alquiler, reparaciones."}),Object(u.jsx)("li",{children:"Transporte: gastos para el coche, combustible, taxi."}),Object(u.jsx)("li",{children:"Salud e higiene: medicamentos, cosm\xe9ticos, productos de limpieza."}),Object(u.jsx)("li",{children:"Diversi\xf3n: cine, teatro, gimnasio, pasatiempo, libros, etc."}),Object(u.jsx)("li",{children:"Otros gastos: los gastos que no encajan en ninguna de las categor\xedas anteriores."})]}),Object(u.jsx)("hr",{className:"mt-5"}),Object(u.jsx)("p",{className:"text-muted font-italic",children:"Fuentes:"}),Object(u.jsx)("p",{className:" text-muted font-italic",children:"https://aprendizfinanciero.com/como-categorizar-tus-gastos/"}),Object(u.jsx)("p",{className:"text-muted font-italic",children:"https://www.inbestme.com/blog/el-presupuesto-ingresos/"})]})},M=i.a.div.withConfig({displayName:"App__Wrapper",componentId:"sc-1tc4o2e-0"})(['font-family:"Quicksand",sans-serif;']),P=i.a.h3.withConfig({displayName:"App__Title",componentId:"sc-1tc4o2e-1"})(["font-weight:300;"]);var V=function(){return Object(u.jsx)(c.b,{basename:"/",children:Object(u.jsxs)(M,{className:"container",children:[Object(u.jsxs)("div",{className:"container mt-5 mb-2 d-flex justify-content-center",children:[Object(u.jsxs)(P,{className:"text-right mr-3 mt-2",children:["BUDG",Object(u.jsx)("br",{}),"APP"]}),Object(u.jsx)("img",{src:"https://icongr.am/clarity/wallet.svg?size=120&color=ff42a7",alt:"Logo app"})]}),Object(u.jsx)(O,{}),Object(u.jsx)(l.a,{exact:!0,path:"/login",component:K}),Object(u.jsx)(l.a,{exact:!0,path:"/register",component:q}),Object(u.jsx)(l.a,{exact:!0,path:"/newdata",component:L}),Object(u.jsx)(l.a,{exact:!0,path:"/categories",component:_}),Object(u.jsx)(j,{children:Object(u.jsx)(l.a,{exact:!0,path:"/",component:k})})]})})};a(98);r.a.render(Object(u.jsx)(c.a,{children:Object(u.jsx)(V,{})}),document.getElementById("root"))}},[[99,1,2]]]);
//# sourceMappingURL=main.82386612.chunk.js.map