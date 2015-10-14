appManagerMSF.controller('metadataexportController', ["$scope",'$filter', "MetaDataExport","MetaDataExportZip", function($scope, $filter, MetaDataExport,MetaDataExportZip) {
	var $translate = $filter('translate');
	
	$scope.progressbarDisplayed = false;
	
	$scope.submit=function(){
		//Show progress bar 
		$scope.progressbarDisplayed = true;
		var result = MetaDataExport.get();
		//include current date in the file name, Helder
		var today = new Date();
		var dd = (today.getDate()<10?'0'+today.getDate():today.getDate());
		var mm = (today.getMonth()<9?'0'+(today.getMonth()+1):today.getMonth()+1);
		var yyyy = today.getFullYear();

		//////
		var fileName = this.file_name+"_"+yyyy+mm+dd;
		result.$promise.then(function(data) {
			//Hide progress bar
			$scope.progressbarDisplayed = false;
				var zip = new JSZip();
				zip.file(fileName + '.json', JSON.stringify(data));
				var content = zip.generate({type:"blob", compression:"DEFLATE"});
				saveAs(content, fileName + '.json.zip');
    	});
	};
		
}]);