'use strict';

var app = angular.module('CitydioApp');

app.controller('homeCtrl', function($scope) {
    console.log('homeCtrl');



});
app.controller('startCtrl', function($q, $http, $scope, $timeout, pitneyBowes) {

  // $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  // $scope.data = [300, 500, 100];
    var initializing = true
    console.log('photoCtrl');
    $scope.loading = false;
    $scope.coordinate = {};
    var latitude;
    var longitude;
    $scope.getLocation = () => {
        $scope.loading = true;
        navigator.geolocation.getCurrentPosition((position) => {
            $scope.loading = false;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            $scope.$apply(function() {
                $scope.coordinate.latitude = latitude;
                $scope.coordinate.longitude = longitude;
            });
            console.log(typeof latitude);
            if (position) {
                console.log('make the pitneyBowes request');
                console.log(latitude, longitude);
                pitneyBowes.getAddress(latitude, longitude).then(function(res) {
                    // console.log(res.data.location[0].address);
                    $scope.coordinate.address = res.data.location[0].address.formattedAddress;
                }, function(err) {
                    console.log('location not found.');
                });
                // pitneyBowes.getDemographics(latitude, longitude).then(function(res) {
                //     console.log(res);
                //     $scope.demographicsData = res.data;
                // }, function(err) {
                //     console.log('location not found.');
                // });
            }
        })
    };
    $scope.genderData = [];
    $scope.genderLabel = [];
    $scope.ageData = [[]];
    $scope.ageLabel = [];
    $scope.incomeData = [[]];
    $scope.incomeLabel = [];
    $scope.educationData = [[]];
    $scope.educationLabel = [];
    $scope.getDemographics = () => {
      console.log('2: ', latitude, longitude);
        navigator.geolocation.getCurrentPosition((position) => {
                pitneyBowes.getDemographics(latitude, longitude).then(function(res) {
                  console.log('res.data', res.data);
                    var gender = res.data.themes.genderTheme.individualValueVariable;
                    gender.forEach(d => {
                      $scope.genderLabel.push(d.name);
                      $scope.genderData.push(d.value);
                      // $scope.genderData[1].push(d.value);
                    });

                    var age = res.data.themes.ageTheme.rangeVariable[0].field;
                    age.forEach(d => {

                      $scope.ageLabel.push(d.description);
                      $scope.ageData[0].push(d.value);
                    });

                    var income = res.data.themes.incomeTheme.rangeVariable[0].field;
                    income.forEach(d => {
                      $scope.incomeLabel.push(d.description);
                      $scope.incomeData[0].push(d.value);
                    });

                    var education = res.data.themes.educationalAttainmentTheme.rangeVariable[0].field;
                    education.forEach(d => {
                      $scope.educationLabel.push(d.description);
                      $scope.educationData[0].push(d.value);
                    });

                    $scope.demographicsData = res.data;
                }, function(err) {
                    console.log('location not found.');
                });
            })
    }
});
app.controller('photoCtrl', function($q, $http, $scope, $timeout, pitneyBowes) {
    var initializing = true
    console.log('photoCtrl');
    $scope.loading = false;
    $scope.coordinate = {};
    $scope.geoFindMe = () => {
        $scope.loading = true;
        navigator.geolocation.getCurrentPosition((position) => {
            $scope.loading = false;
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            $scope.$apply(function() {
                $scope.coordinate.latitude = latitude;
                $scope.coordinate.longitude = longitude;
            });
            console.log(typeof latitude);
            if (position) {
                console.log('make the pitneyBowes request');
                console.log(latitude, longitude);
                pitneyBowes.getDemographics(latitude, longitude).then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log('location not found.');
                });
            }
        })
    }
    $scope.getPhoto = () => {
        $scope.photo = {};
        $http({
            method: 'GET',
            url: 'https://ie-public-safety.run.aws-usw02-pr.ice.predix.io/v1/assets/1000000018/media?media-types=IMAGE&start-ts=1453832741281&end-ts=1462996283887&size=1&page=1',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI2NWM1N2MxNy00Y2VkLTQwNmItYjIyYy1mODA0NDlmNzhjMGQiLCJzdWIiOiJpZXNfaW90aGFjayIsInNjb3BlIjpbImllLXRyYWZmaWMuem9uZXMuZmRlMjljODMtZDI3Yi00ZjhjLWI0YzgtMWM3Yjc3MjE3MGViLnVzZXIiLCJ1YWEucmVzb3VyY2UiLCJpZS1wZWRlc3RyaWFuLnpvbmVzLmU4ZTU5N2JlLWZiODMtNGI3ZS04ZmY0LTNhMGMxNGEyYjY4MC51c2VyIiwiaWUtcHVibGljLXNhZmV0eS56b25lcy5kYzQ4MjlhOS0zMDg3LTQxNGEtOWFiMi00ZGJmNmYyNjQyNjMudXNlciIsImllLXBhcmtpbmcuem9uZXMuZjlhMWE2MzItOWUxZS00ZGZlLWE2NjItNTNiMzk2ZTEwMGFiLnVzZXIiXSwiY2xpZW50X2lkIjoiaWVzX2lvdGhhY2siLCJjaWQiOiJpZXNfaW90aGFjayIsImF6cCI6Imllc19pb3RoYWNrIiwiZ3JhbnRfdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsInJldl9zaWciOiIzMWE2ZmQ3ZiIsImlhdCI6MTQ2Mjk5MjQ5NywiZXhwIjoxNDYzMDc4ODk3LCJpc3MiOiJodHRwczovLzliZjhkMDk0LTcxYTItNDkxMi05YzU2LWZjZGJhZGEyZmM0ZS5wcmVkaXgtdWFhLnJ1bi5hd3MtdXN3MDItcHIuaWNlLnByZWRpeC5pby9vYXV0aC90b2tlbiIsInppZCI6IjliZjhkMDk0LTcxYTItNDkxMi05YzU2LWZjZGJhZGEyZmM0ZSIsImF1ZCI6WyJpZXNfaW90aGFjayIsImllLXRyYWZmaWMuem9uZXMuZmRlMjljODMtZDI3Yi00ZjhjLWI0YzgtMWM3Yjc3MjE3MGViIiwidWFhIiwiaWUtcGVkZXN0cmlhbi56b25lcy5lOGU1OTdiZS1mYjgzLTRiN2UtOGZmNC0zYTBjMTRhMmI2ODAiLCJpZS1wdWJsaWMtc2FmZXR5LnpvbmVzLmRjNDgyOWE5LTMwODctNDE0YS05YWIyLTRkYmY2ZjI2NDI2MyIsImllLXBhcmtpbmcuem9uZXMuZjlhMWE2MzItOWUxZS00ZGZlLWE2NjItNTNiMzk2ZTEwMGFiIl19.VlUqRBMqYwEPc8wEKcp4L0gy3m8aY-v0x0nCHD0oONjkDvcqXWQiANq0KL1x-LFMJhvXApmYtKvrlJSKZSEhRHUWqxJDfJVVYaibjwLScuBUctCvh6v8_9kBobQ5AIAszaJkSe210EPdNbTp0k5BGbN4UwvRUU-280rWZ6eJyXpQKVwz6EETNly7nmXmCk9eN8ImYaQ_gMqPJ-a2IlEBBAkq0TJcFYcdb9gHoKSPV2-rz8EOgUbVO3tO7s-so1gBkiej0Nxl0_-JE43izF2OMThRCCBCFvGlUpsrd3xhvWUWoWgvNtydNEUYYKMzmNF-52IHOQedzBj-9qBZ_uotDw',
                'Predix-Zone-Id': 'dc4829a9-3087-414a-9ab2-4dbf6f264263'
            }
        }).then((res) => {
            console.log('res._links: ', res._links);
            // var photoOne = res._links.first.href;
            // console.log('photoOne', photoOne);
            // $scope.$apply(function() {
            //     $scope.photo.one = photoOne; madavi
            // });
        }, (err) => {
            console.log('errrr: ', err);
        });
    }
});
