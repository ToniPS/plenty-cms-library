(function(pm) {

    /**
     * Provide methods for receiving layout containers, layout parameters
     * or category content from API
     * @module Factories
     * @class CMSFactory
     * @static
     */
	pm.factory('CMSFactory', function(API) {

		return {
            getContainer: getContainer,
            getParams: getParams,
            getCategoryContent: getCategoryContent
		};

        /**
         * Prepare the request to receive HTML-Content from CMS
         * @function getContainer
         * @param   {string} containerName The Layoutcontainer to receive.
         * @param   {string} [params='']   Additional GET-parameters. Will be appended to request URL
         * @returns {object}               The prepared request. Call <code>.from( layoutGroup )</code> to specify the location in the CMS
         *                                 (e.g. 'Checkout')
         * @example
         *          CMSFactory.getContainer( 'CheckoutTotals' ).from( 'Checkout' )
         *              .done(function( response ) {
         *                  // container content
         *                  var html = response.data[0]
         *              });
         */
        function getContainer( containerName, params ) {

            function from( layoutGroup ) {

                params = params || '';
                return API.get( '/rest/' + layoutGroup.toLowerCase() + '/container_' + containerName.toLowerCase() + '/' + params );

            }

            return {
                from: from
            }

        }

        /**
         * Prepare the request to receive Layout parameters for a template
         * @function getParams
         * @param   {string} containerName The Layoutcontainer to receive the parameteres of.
         * @param   {string} [params='']   Additional GET-parameters. Will be appended to request URL
         * @returns {object}               The prepared request. Call <code>.from( layoutGroup )</code> to specify the location in the CMS
         *                                 (e.g. 'ItemView')
         * @example
         *          CMSFactory.getParams( 'BasketItemsList' ).from( 'ItemView' )
         *              .done(function( response ) {
         *                  // BasketItems
         *                  var items = response.data;
         *              });
         */
        function getParams( containerName, params ) {

            function from( layoutGroup ) {

                params = params || '';
                return API.get( '/rest/' + layoutGroup.toLowerCase() + '/' + containerName.toLowerCase() + '/' + params );

            }

            return {
                from: from
            }
        }

        /**
         * Get the content of a category specified by its ID
         * @function getCategoryContent
         * @param   {number} categoryID    The ID of the category to get the content from
         * @returns {object} <a href="http://api.jquery.com/category/deferred-object/" target="_blank">jQuery deferred Object</a>
         */
        function getCategoryContent( categoryID ) {

            return API.get( '/rest/categoryview/categorycontentbody/?categoryID=' + categoryID );
        }

	}, ['APIFactory']);
}(PlentyFramework));