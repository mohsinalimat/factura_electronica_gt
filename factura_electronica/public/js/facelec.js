console.log("Se cargo exitosamente la aplicación de Factura Electrónica");
/* 1 --------------------------------------------------------------------------------------------------------------- */
/**
 * Funcionamiento: Valida que el Nit sea C/F o un numero de nit valido permitiendo
 * activar la opcion para guardar. Si el nit es invalido desactiva la funcion
 * guardar hasta que se ingrese uno correcto, esto permite no tener errores con
 * INFILE y tener los datos correctos.
 */
export function valNit(nit, cus_supp, frm) {
    var nit_validado;
    if (nit === "C/F" || nit === "c/f") {
        frm.enable_save(); // Activa y Muestra el boton guardar de Sales Invoice
    } else {
        var nd, add = 0;
        if (nd = /^(\d+)\-?([\dk])$/i.exec(nit)) {
            nd[2] = (nd[2].toLowerCase() == 'k') ? 10 : parseInt(nd[2]);
            for (var i = 0; i < nd[1].length; i++) {
                add += ((((i - nd[1].length) * -1) + 1) * nd[1][i]);
            }
            nit_validado = ((11 - (add % 11)) % 11) == nd[2];
        } else {
            nit_validado = false;
        }

        if (nit_validado === false) {
            frappe.show_alert({
                indicator: 'orange',
                message: __(`
                NIT de <a href= '#Form/Customer/${cus_supp}'><b>${cus_supp}</b></a> no es correcto. Si no tiene disponible el NIT modifiquelo a C/F.
                `)
            });

            frm.disable_save(); // Desactiva y Oculta el boton de guardar en Sales Invoice
        }
        if (nit_validado === true) {
            frm.enable_save(); // Activa y Muestra el boton guardar de Sales Invoice
        }
    }
}

/* ----------------------------------------------------------------------------------------------------------------- */
/** Verificacion para que exista un solo check */
frappe.ui.form.on("Item", {
    facelec_is_fuel: function (frm, cdt, cdn) {
        if (frm.doc.facelec_is_fuel) {
            cur_frm.set_value("facelec_is_good", 0);
            cur_frm.set_value("facelec_is_service", 0);
        }
    },
    facelec_is_good: function (frm, cdt, cdn) {
        if (frm.doc.facelec_is_good) {
            cur_frm.set_value("facelec_is_fuel", 0);
            cur_frm.set_value("facelec_is_service", 0);
        }
    },
    facelec_is_service: function (frm, cdt, cdn) {
        if (frm.doc.facelec_is_service) {
            cur_frm.set_value("facelec_is_fuel", 0);
            cur_frm.set_value("facelec_is_good", 0);
        }
    }
});

// Validador NIT para customer
// Descripcion de Nombre legal
frappe.ui.form.on("Customer", {
    nit_face_customer: function (frm) {
        valNit(frm.doc.nit_face_customer, frm.doc.name, frm);
        frm.set_value('tax_id', frm.doc.nit_face_customer);
    },
    tax_id: function (frm) {
        valNit(frm.doc.tax_id, frm.doc.name, frm);
        frm.set_value('nit_face_customer', frm.doc.tax_id);
    },
    refresh: function (frm) {
        var cust_name_desc = __("Legal Name, for tax, government or contract use. For Example: Apple, Inc. Amazon.com, Inc., The Home Depot, Inc.");
        cur_frm.set_df_property("customer_name", "description", cust_name_desc);
        frm.refresh_field('customer_name');
    },
    onload: function (frm) {
        frm.set_value('tax_id', frm.doc.nit_face_customer);
        frm.set_value('nit_face_customer', frm.doc.tax_id);
    }
});

// Validador NIT para Supplier
// descripcion de nombre legal
frappe.ui.form.on("Supplier", {
    facelec_nit_proveedor: function (frm) {
        valNit(frm.doc.facelec_nit_proveedor, frm.doc.name, frm);
        frm.set_value('tax_id', frm.doc.facelec_nit_proveedor);
    },
    tax_id: function (frm) {
        valNit(frm.doc.tax_id, frm.doc.name, frm);
        frm.set_value('facelec_nit_proveedor', frm.doc.tax_id);
    },
    refresh: function (frm) {
        var supp_name_desc = __("Legal Name, for tax, government or contract use. For Example: Apple, Inc. Amazon.com, Inc., The Home Depot, Inc.");
        cur_frm.set_df_property("supplier_name", "description", supp_name_desc);
        frm.refresh_field('supplier_name');
    }
});

frappe.ui.form.on("Company", {
    nit_face_company: function (frm) {
        // valNit(frm.doc.nit_face_company, frm.doc.name, frm);
        frm.set_value('tax_id', frm.doc.nit_face_company);
    },
    tax_id: function (frm) {
        // valNit(frm.doc.tax_id, frm.doc.name, frm);
        frm.set_value('nit_face_company', frm.doc.tax_id);
    },
    setup: function (frm) {
        frm.set_query('isr_account_payable', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('isr_account_receivable', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('iva_account_payable', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('vat_account_receivable', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('vat_retention_to_compensate', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('vat_retention_payable', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        frm.set_query('income_tax_retention_payable_account', 'tax_witholding_ranges', () => {
            return {
                filters: {
                    company: frm.doc.name,
                    is_group: 0
                }
            }
        });

        cur_frm.refresh_field('report_list');
    },
});
/* en-US: INDIVIDUAL SOURCE CODE FROM .js FILES IN THIS DIRECTORY WILL BE ADDED WHEN DOING A BENCH BUILD
   es-GT: CODIGO FUENTE INDIVIDUAL DE ARCHIVOS .js EN ESTE DIRECTORIO SE AGREGARAN ABAJO AL HACER BENCH BUILD */

// ================================================================================================================ //

// en: Address field descriptions in spanish
// es-GT: descripciones campos de direcciones en español
frappe.ui.form.on("Address", {
    refresh: function (frm) {
        frm.set_df_property("address_line1", "description", __("<b>* FEL: Direccion Comercial 1</b>"));
        frm.set_df_property("city", "description", __("<b>FEL: Ciudad</b>  p. ej.: Antigua Guatemala"));
        frm.set_df_property("state", "description", __("<b>FEL: Departamento</b>  p. ej.: Sacatepéquez"));
        frm.set_df_property("county", "description", __("<b>FEL: Municipio</b>  p. ej.: Antigua Guatemala"));
        frm.set_df_property("county", "reqd", 1);
        frm.set_df_property("country", "description", __("<b>FEL: Pais</b>  p. ej: Guatemala"));
        frm.set_df_property("email_id", "description", __("<b>FEL: Correo Electronico</b>  p. ej: micorreo@hola.com"));
        frm.set_df_property("email_id", "reqd", 1);
        frm.set_df_property("phone", "description", __("<b>Teléfono:</b>  p. ej: +502 2333-2516"));
        frm.set_df_property("pincode", "description", __("<b>FEL: Código Postal</b>  p. ej.: 03001"));
        frm.set_df_property("is_primary_address", "description", __("<b>FEL: Dirección para facturar</b>"));
    }
});


frappe.ui.form.on("Expense Claim Detail", {
    reference: function (frm, cdt, cdn) {
        /** Al campo amount le asigna el valor de grand total obtenido de la factura seleccionada */
        let row = frappe.get_doc(cdt, cdn);
        if (row.reference) {
            row.amount = row.grand_total;
            frm.refresh();
        } else {
            row.amount = '';
            frm.refresh();
        }
    },
});

// Personalizador de quick entry en customer
frappe.provide('frappe.ui.form');

frappe.ui.form.CustomerQuickEntryForm = frappe.ui.form.QuickEntryForm.extend({
    init: function (doctype, after_insert) {
        this.skip_redirect_on_error = true;
        this._super(doctype, after_insert);
    },

    render_dialog: function () {
        // console.log('Ejecutando prueba')
        this.mandatory = this.get_field();
        this._super();
    },

    get_field: function () {
        const variant_fields = [
            {
                label: __('Full Name'),
                fieldname: 'customer_name',
                fieldtype: 'Data',
            },
            {
                label: __('Type'),
                fieldname: 'customer_type',
                fieldtype: 'Select',
                options: ['', 'Company', 'Individual']
            },
            {
                fieldtype: "Section Break",
                label: __(""),
                collapsible: 0
            },
            {
                label: __('NIT FEL'),
                fieldname: 'nit_face_customer',
                fieldtype: 'Data',
                default: 'C/F',
                description: '<b>FEL:</b> Si no tiene disponible el NIT escriba C/F'
            },
            {
                fieldtype: "Column Break"
            },
            {
                label: __('NIT'),
                fieldname: 'tax_id',
                fieldtype: 'Data',
                default: 'C/F',
                reqd: true,
                description: '<b>FEL:</b> Si no tiene disponible el NIT escriba C/F'
            },
            {
                fieldtype: "Section Break",
                label: __(""),
                collapsible: 0
            },
            {
                label: __('Customer Group'),
                fieldname: 'customer_group',
                fieldtype: 'Link',
            },
            {
                label: __('Territory'),
                fieldname: 'territory',
                fieldtype: 'Link',
            },

            {
                fieldtype: "Section Break",
                label: __("Primary Contact Details"),
                collapsible: 1
            },
            {
                label: __("Email ID"),
                fieldname: "email_id",
                fieldtype: "Data",
                options: 'Email',
                reqd: 1
            },
            {
                fieldtype: "Column Break"
            },
            {
                label: __("Mobile Number"),
                fieldname: "mobile_no",
                fieldtype: "Data"
            },

            {
                fieldtype: "Section Break",
                label: __("Primary Address Details"),
                collapsible: 1
            },
            {
                label: __("Address Line 1"),
                fieldname: "address_line1",
                fieldtype: "Data",
                default: 'Guatemala',
                reqd: 1,
                options: '<b>FEL</b>'
            },
            {
                label: __("Address Line 2"),
                fieldname: "address_line2",
                fieldtype: "Data"
            },
            {
                label: __("City/Town"),
                fieldname: "city",
                fieldtype: "Data",
                default: 'Guatemala',
                reqd: 1,
                description: '<b>FEL Ciudad</b> ej.: Antigua Guatemala'
            },
            {
                label: __("County"),
                fieldname: "county",
                fieldtype: "Data",
                default: 'Guatemala',
                reqd: 1,
                description: '<b>FEL: Municipio</b> p. ej.: Antigua Guatemala'
            },
            {
                label: __("State"),
                fieldname: "state",
                fieldtype: "Data",
                default: 'Guatemala',
                reqd: 1,
                description: '<b>FEL Departamento</b> ej.: Sacatepéquez'
            },
            {
                label: __("Country"),
                fieldname: "country",
                fieldtype: "Link",
                default: 'Guatemala',
                reqd: 1,
                options: 'Country',
                description: '<b>FEL Pais</b> ej: Guatemala'
            },
            {
                label: __("ZIP Code"),
                fieldname: "pincode",
                default: '0',
                reqd: 1,
                fieldtype: "Data",
                description: '<b>FEL Código Postal</b> ej.: 03001'
            },
            {
                fieldtype: "Column Break"
            },
            {
                label: __("Phone"),
                fieldname: "phone",
                fieldtype: "Data",
                allow_in_quick_entry: 1
            },
            {
                label: __("Email Address"),
                fieldname: "email_id",
                fieldtype: "Data",
                reqd: 1,
                allow_in_quick_entry: 1,
                // options: 'Email',
                description: '<b>FEL Correo Electronico</b> ej: micorreo@hola.com',
            },
            {
                label: __("Preferred Billing Address"),
                fieldname: "is_primary_address",
                fieldtype: "Check",
                description: '<b>FEL Dirección para facturar</b>',
                allow_in_quick_entry: 1
            }];

        return variant_fields;
    },
})