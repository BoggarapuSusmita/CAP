sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../model/formatter"
  ],
  function (BaseController, MessageToast, Filter, FilterOperator, formatter) {
    "use strict";

    return BaseController.extend("project1.controller.App", {
      onInit() {
        this.resourceModel = this.getView().getModel("i18n").getResourceBundle();

      },
      formatter: formatter,

      onShowHello: function () {
        var recipient = this.getView().getModel("helloPanel").getProperty("/recipient/name");
        var msg = this.resourceModel.getText("helloMsg", [recipient]);
        MessageToast.show(msg);
      },
      onFilterProducts: function (oEvent) {
        var aFilter = [], sQuery = oEvent.getParameter("query"),
          oList = this.getView().byId("productsList"),
          oBinding = oList.getBinding("items");
        if (sQuery) {
          aFilter.push(new sap.ui.model.Filter("ProductID", sap.ui.model.FilterOperator.Contains, sQuery));
        }
        oBinding.filter(aFilter);
      },
      onItemSelected: function (oEvent) {
        var oSelectedItem = oEvent.getSource();
        var oContext = oSelectedItem.getBindingContext();
        var sPath = oContext.getPath();
        var oProductDetailPanel = this.byId("productDetailsPanel");
        oProductDetailPanel.bindElement({ path: sPath });
        this.byId("productDetailsPanel").setVisible(true);
      },
    });
  }
);
