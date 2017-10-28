frappe.ui.form.on("Sales Invoice", "refresh", function(frm) {

    cur_frm.add_fetch("customer", "nit_face_customer", "nit_face_customer");

    function pdf_button() {
        frm.add_custom_button(__("Obtener PDF"),
            function() {
                var cae_fac = frm.doc.cae_factura_electronica
                var link_cae_pdf = "https://www.ingface.net/Ingfacereport/dtefactura.jsp?cae="
                    //console.log(cae_fac)
                window.open(link_cae_pdf + cae_fac);
            }).addClass("btn-primary")
    }

    if (frm.doc.status === "Paid" || frm.doc.status === "Unpaid" || frm.doc.status === "Submitted") {

        if (frm.doc.cae_factura_electronica) {
            cur_frm.clear_custom_buttons();
            pdf_button();
        } else {
            frm.add_custom_button(__('Factura Electronica'), function() {
                frappe.call({
                    method: "factura_electronica.api.generar_factura_electronica",
                    args: {
                        serie_factura: frm.doc.name,
                        nombre_cliente: frm.doc.customer
                    },
                    callback: function(r) {

                        frm.set_value('cae_factura_electronica', r.message);
                        //console.log(frm.doc.cae_factura_electronica);
                        //frm.reload_doc();
                        if (frm.doc.cae_factura_electronica) {
                            cur_frm.clear_custom_buttons();
                            pdf_button();
                        }
                    }
                })
            }).addClass("btn-primary");
        }

    }

});