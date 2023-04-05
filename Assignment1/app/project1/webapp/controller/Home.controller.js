sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("project1.controller.Home", {
            onInit: function () {

            },
            onAddProducts: function (oEvent) {
                this.byId("idPanel").setVisible(true);
                this.byId("products").setVisible(false);
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (oData, oResponse) {
                        var count = oData.results.length + 1;
                        this.byId("ID").setText(count);
                    }.bind(this),
                    error: function (oError, oResponse) {
                        reject(oError);
                    }
                });
            },
            onBack: function (oEvent) {
                this.byId("idPanel").setVisible(false);
                this.byId("products").setVisible(true);
            },
            onSubmit: function (oEvent) {
                this.byId("idPanel").setVisible(false);
                this.byId("products").setVisible(true);
                var oModel = this.getOwnerComponent().getModel();
                var ID, Description, Price, Weight, Color, Height, Width, Depth;
                ID = this.byId("ID").getText();
                Description = this.byId("Description").getValue();
                Price = this.byId("Price").getValue();
                Weight = this.byId("Weight").getValue();
                Color = this.byId("Color").getValue();
                Height = this.byId("Height").getValue();
                Width = this.byId("Width").getValue();
                Depth = this.byId("Depth").getValue();

                var payload = {
                    ID: ID, Description: Description, Price: Price, Weight: Weight,
                    Color: Color, Height: Height, Width: Weight, Depth: Depth
                };
                oModel.create("/Products", payload, {
                    success: function (oData, oResponse) {
                        MessageToast.show("Added Successfully");
                    }.bind(this),
                    error: function (oError, oResponse) {
                        reject(oError);
                    }
                });
            },
            onEditProducts: function (oEvent) {
                var oTable = this.byId("products");
                var selectedIndex = oTable.getSelectedIndex();
                if(selectedIndex===-1){
                    MessageToast.show("Select a row");
                    return;
                }
                selectedIndex+=1;
                var oModel=this.getOwnerComponent().getModel();
                var oIndex="Products("+selectedIndex+")";
                var oRowData = oModel.oData[oIndex];
                this.editProductDialog = this.loadFragment({
                    name: "project1.view.EditProduct"
                });
                this.editProductDialog.then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    this.byId("ID1").setText(oRowData.ID);
                    this.byId("Description1").setValue(oRowData.Description);
                    this.byId("Price1").setValue(oRowData.Price);
                    this.byId("Weight1").setValue(oRowData.Weight);
                    this.byId("Color1").setValue(oRowData.Color);
                    this.byId("Height1").setValue(oRowData.Height);
                    this.byId("Width1").setValue(oRowData.Width);
                    this.byId("Depth1").setValue(oRowData.Depth);
                    oDialog.open();
                }.bind(this));
            },
            onPressClose:function(oEvent){
                this.byId("idEditProductDialog").destroy();
                this.byId("products").clearSelection();
            },
            onUpdate:function(oEvent){
                var oModel=this.getOwnerComponent().getModel();
                var ID, Description, Price, Weight, Color, Height, Width, Depth;
                ID = this.byId("ID1").getText();
                Description = this.byId("Description1").getValue();
                Price = this.byId("Price1").getValue();
                Weight = this.byId("Weight1").getValue();
                Color = this.byId("Color1").getValue();
                Height = this.byId("Height1").getValue();
                Width = this.byId("Width1").getValue();
                Depth = this.byId("Depth1").getValue();
                var payload = {
                    ID: ID, Description: Description, Price: Price, Weight: Weight,
                    Color: Color, Height: Height, Width: Width, Depth: Depth
                };
                oModel.update("/Products("+ID+")",payload,{
                    success: function (oData, oResponse) {
                        MessageToast.show("Updated Successfully");
                    }.bind(this),
                    error: function (oError, oResponse) {
                        reject(oError);
                    }
                })
                this.byId("idEditProductDialog").destroy();
                this.byId("products").clearSelection();
            },
            onFilterProducts: function (oEvent) {
                var aFilter = [], sQuery = oEvent.getParameter("query");
                if (sQuery) {
                  aFilter.push(new Filter("Description", FilterOperator.Contains, sQuery));
                }
                var oTable=this.byId("products");
                var oitems=oTable.getBinding("rows");
                oitems.filter(aFilter);
              },
        });
    });
