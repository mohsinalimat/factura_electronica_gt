"use strict";(self.webpackChunkfacelec_docs=self.webpackChunkfacelec_docs||[]).push([[509],{304:(a,e,t)=>{t.r(e),t.d(e,{data:()=>r});const r={key:"v-8daa1a0e",path:"/",title:"App Factura Electrónica",lang:"es-GT",frontmatter:{},excerpt:"",headers:[{level:2,title:"Características",slug:"caracteristicas",children:[]}],filePathRelative:"README.md",git:{updatedTime:1628640648e3,contributors:[{name:"monroy95",email:"m.monroyc22@gmail.com",commits:1}]}}},1650:(a,e,t)=>{t.r(e),t.d(e,{default:()=>c});const r=(0,t(6252).uE)('<h1 id="app-factura-electronica" tabindex="-1"><a class="header-anchor" href="#app-factura-electronica" aria-hidden="true">#</a> App Factura Electrónica</h1><p>Aplicación para la generación de facturas electrónicas en Guatemala, basado en el modulo de Cuentas y Almacén de ERPNext y el DocType de Factura de Ventas.</p><p>Requiere de un servicio contratado por separado para conectar a su API.</p><p>https://github.com/sihaysistema/factura_electronica_gt</p><h2 id="caracteristicas" tabindex="-1"><a class="header-anchor" href="#caracteristicas" aria-hidden="true">#</a> Características</h2><ol><li>Envío de datos de Factura de Venta validada a servicio de facturación electrónica. Envía todos los campos requeridos por la SAT.</li><li>Estima automáticamente el valor de cualquier otro impuesto unitario como: IDP, Tabaco, Licor, Cemento, Timbres, etc. y realiza los cálculos automáticos, totalizando el IVA y los demás impuestos y colocándolos en la tabla de impuestos existente de ERPNext con la cuenta contable designada para cada impuesto, en cada Producto (Artículo o Item) del módulo de Almacén.</li><li>El impuesto unitario se configura en cada Producto, indicando el valor por Unidad de Medida, y la cuenta contable a donde desea cargar el impuesto. Si es un producto para la venta, indique una cuenta de Impuesto por Pagar (Pasivo). Si es un producto para la compra, indique la cuenta de Gasto del impuesto (Cuentas de Gastos). Al cargar el articulo en la factura de venta, automáticamente estimará el valor del impuesto, tomando en cuenta ese valor previo a calcular el IVA.</li><li>Para cumplir con los códigos de Unidades de Medida correctos, es necesario modificar la Unidad de Medida presente en su instalación de ERPNext para colocar el código de tres letras en mayúscula. Por ej. &quot;Unidad&quot; ahora le aparece un campo en donde debe colocar &quot;UNI&quot;.</li><li>Automáticamente captura el <strong>cae</strong> o Validador Digital, que es un número único que le da validez legal a la factura. El programa revisa la existencia de una transacción de envió y recepción de datos.</li><li>En caso de no poder generar la factura electrónica, el programa le indica cual es el error para determinar si es de comunicación, del software interno, o del proveedor de servicio.</li><li>Agrega una sección a la Factura de Venta que totaliza el IVA de la cantidad de artículos en la factura, a tres categorías separadas requeridas para eventual uso en el Libro de Compras de la SAT.</li></ol>',6),c={render:function(a,e){return r}}}}]);