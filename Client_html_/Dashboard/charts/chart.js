$( document ).ready(function() {

	$('.table_d').draggable() 
	$('.graph1').draggable() 
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
	  var data = google.visualization.arrayToDataTable([
		['Year', 'WO', 'Created','Accepted','Departed','Arrived'],
		['Today',  100,       50,         20,         25,       5],
		['Today-1',  150,       20,         35,         2,       15],
		['Today-2',  100,       50,         20,         25,       5],
		['Today-3',  100,       50,         20,         25,       5],
		['Today-4',  100,       50,         20,         25,       5],
	  ]);

	  var options = {
		title: 'Company Performance',
		hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	  };

	  var chart = new google.visualization.AreaChart(document.getElementById('chart_div2'));
	  chart.draw(data, options);
	}
   

$(".graph1").append(html)

	 var myChart = echarts.init(document.getElementById('chart_div'));
	 var xAxisData = [];
	 var data1 = [];
	 var data2 = [];
	 for (var i = 0; i < 100; i++) {
		 xAxisData.push('类目' + i);
		 data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
		 data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
	 }
	 
	 option = {
		color: ['#56ba2e','#d1302b'],
		 title: {
			 text: '柱状图动画延迟'
		 },
		 legend: {
			 data: ['bar', 'bar2']
		 },
		 toolbox: {
			 // y: 'bottom',
			 feature: {
				 magicType: {
					 type: ['stack', 'tiled']
				 },
				 dataView: {},
				 saveAsImage: {
					 pixelRatio: 2
				 }
			 }
		 },
		 tooltip: {},
		 xAxis: {
			 data: xAxisData,
			 splitLine: {
				 show: false
			 }
		 },
		 yAxis: {
		 },
		 series: [{
			 name: 'bar',
			 type: 'bar',
			 data: data1,
			 animationDelay: function (idx) {
				 return idx * 10;
			 }
		 }, {
			 name: 'bar2',
			 type: 'bar',
			 data: data2,
			 animationDelay: function (idx) {
				 return idx * 10 + 100;
			 }
		 }],
		 animationEasing: 'elasticOut',
		 animationDelayUpdate: function (idx) {
			 return idx * 5;
		 }
	 };
	 myChart.setOption(option);
	 var html=`
	 <div class="table-services">
		 <div style="background:">
		 
		   <div id="chart_div" style="width: 500px; height: 300px;"></div>
			 
		 </div>
	 </div>`
}) 