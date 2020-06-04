
module.exports = function Cos_Cumparaturi(cos_cumparaturi) {
    this.items = cos_cumparaturi.Elemente || {};
    this.ItemeTotale = cos_cumparaturi.ItemeTotale || 0;
    this.PretTotal = cos_cumparaturi.PretTotal || 0;

    this.add = function(element, id) {
        var elementCos = this.Elemente[id];
        if (!elementCos) {
            elementCos = this.Elemente[id] = {element: element, cantitate: 0, pret: 0};
        }
        elementCos.cantitate++;
        elementCos.pret = elementCos.element.pret * elementCos.cantitate;
        this.ItemeTotale++;
        this.PretTotal += elementCos.element.pret;
    };

    this.remove = function(id) {
        this.ItemeTotale -= this.Elemente[id].cantitate;
        this.PretTotal -= this.Elemente[id].pret;
        delete this.Elemente[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.Elemente) {
            arr.push(this.Elemente[id]);
        }
        return arr;
    };
};