/* global define */
define([
    'underscore',
    'marionette',
    'apps/notebooks/list/behaviors/compositeBehavior',
    'apps/notebooks/list/views/notebooksItem',
    'text!apps/notebooks/list/templates/notebooksList.html'
], function(_, Marionette, Behavior, ItemView, Tmpl) {
    'use strict';

    /**
     * Notebooks composite view.
     * Everything happens in its behavior class.
     */
    var View = Marionette.CompositeView.extend({
        template: _.template(Tmpl),

        childView: ItemView,
        childViewContainer: '.list-notebooks',

        behaviors: {
            CompositeBehavior: {
                behaviorClass: Behavior
            }
        },

        /**
         * Build tree structure
         */
        attachHtml: function(colView, itemView) {
            var parentId = itemView.model.get('parentId');

            if (parentId === '0' || parentId === '') {
                this.$(colView.childViewContainer).append(itemView.el);
            } else {
                this.$('div[data-id=' + String(parentId) + ']').append(itemView.el);
            }
        }

    });

    return View;
});
