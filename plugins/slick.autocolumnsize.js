(function($) {

    $.extend(true, window, {
        "Slick": {
            "AutoColumnSize": AutoColumnSize
        }
    });

    function AutoColumnSize(maxWidth) {

        var grid, $container, context,
            keyCodes = {
                'A': 65
            };

        function init(_grid) {
            grid = _grid;
            maxWidth = maxWidth || 200;

            $container = $(grid.getContainerNode());
            $container.on("dblclick.autosize", ".slick-resizable-handle", reSizeColumn);
            $container.keydown(handleControlKeys);

            context = document.createElement("canvas").getContext("2d");
        }

        function destroy() {
            $container.off();
        }

        function handleControlKeys(event) {
            if (event.ctrlKey && event.shiftKey && event.keyCode === keyCodes.A) {
                resizeAllColumns();
            }
        }

        function resizeAllColumns() {
            var elHeaders = $container.find(".slick-header-column");
             elHeaders.each(function(index, el) {
                var columnDef = $(el).data('column'); 
                var colIndex = grid.getColumnIndex(columnDef.id);
                grid.autosizeColumn(colIndex) 
            });
            grid.reRenderColumns();
        }

        function reSizeColumn(e) {
            var headerEl = $(e.currentTarget).closest('.slick-header-column');
            var columnDef = headerEl.data('column');

            if (!columnDef || !columnDef.resizable) {
                return;
            } 
            e.preventDefault();
            e.stopPropagation(); 
            if(e.ctrlKey){
                resizeAllColumns();
            } else {
            var colIndex = grid.getColumnIndex(columnDef.id);
            grid.autosizeColumn(colIndex);            
            grid.reRenderColumns() }
        } 

        return {
            init: init,
            destroy: destroy
        };
    }
}(jQuery));