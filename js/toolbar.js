define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/on",
    "esri/dijit/Legend",
    "dojo/domReady!"
  ], function(
    declare, domConstruct, on, Legend
  ) {
    return declare(null, {
      config: {},
      map: null,
  
      constructor: function(config) {
        this.config = config;
      },
  
      startup: function(map) {
        this.map = map;
        this._addTools();
      },
  
      _addTools: function() {
        var toolsContainer = domConstruct.toDom("panelTools");
        this.config.tools.forEach(function(tool) {
          if (tool.enabled) {
            switch (tool.name) {
              case "legend":
                this._addLegend(toolsContainer);
                break;
              case "zoom":
                this._addZoom(toolsContainer);
                break;
            }
          }
        }.bind(this));
      },
  
      _addLegend: function(container) {
        var button = domConstruct.create("button", {
          className: "tool-button",
          innerHTML: "Legend"
        }, container);
        var legendDiv = domConstruct.create("div", { id: "legendDiv" });
        on(button, "click", function() {
          if (!this.legend) {
            this.legend = new Legend({
              map: this.map,
              layerInfos: arcgisUtils.getLegendLayers({ itemInfo: this.map.itemInfo })
            }, legendDiv);
            this.legend.startup();
            document.body.appendChild(legendDiv);
          }
        }.bind(this));
      },
  
      _addZoom: function(container) {
        var button = domConstruct.create("button", {
          className: "tool-button",
          innerHTML: "Zoom In"
        }, container);
        on(button, "click", function() {
          this.map.setZoom(this.map.getZoom() + 1);
        }.bind(this));
      }
    });
  });