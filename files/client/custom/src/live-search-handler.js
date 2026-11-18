define('custom:case-live-search-handler', [], function () {
    let Handler = function (view) {
        this.view = view;
    };

    _.extend(Handler.prototype, {
        process: function () {
            // Safely wait until the view has rendered before binding DOM events
            this.view.once('after:render', () => {
                if (!this.view.$el) return;

                let timer = null;
                
                this.view.$el.on('input', 'input[name="textFilter"]', (e) => {
                    const target = e.target;
                    const val = target.value.trim();

                    // Enforce the 2-character threshold (allows empty string to reset)
                    if (val.length > 0 && val.length < 2) {
                        return;
                    }

                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        const searchBtn = this.view.$el.find('button[data-action="search"]')[0];
                        if (searchBtn) {
                            searchBtn.click();
                        }
                    }, 300);
                });
            });
        }
    });

    _.extend(Handler.prototype, Backbone.Events);
    return Handler;
});