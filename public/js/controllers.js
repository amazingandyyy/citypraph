'use strict';

var app = angular.module('CitydioApp');

app.controller('homeCtrl', function($scope) {
    console.log('homeCtrl');
});
app.controller('startCtrl', function($q, $http, $scope, $timeout, pitneyBowes) {
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
            if (position) {
                console.log('make the pitneyBowes request');
                console.log(latitude, longitude);
                pitneyBowes.getAddress(latitude, longitude).then(function(res) {
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
    $scope.incomeData = [];
    $scope.incomeLabel = [];
    $scope.educationData = [[]];
    $scope.educationLabel = [];
    $scope.transportationData = [[]];
    $scope.transportationLabel = [];
    $scope.assetsData = [];
    $scope.assetsLabel = [];
    $scope.raceData = [];
    $scope.raceLabel = [];
    $scope.maritalData = [[]];
    $scope.maritalLabel = [];

    $scope.getDemographics = () => {
            //   console.log('2: ', latitude, longitude);
            //     navigator.geolocation.getCurrentPosition((position) => {
            //             pitneyBowes.getDemographics(latitude, longitude).then(function(res) {
            //               console.log('res.data', res.data);

            ///////////////////////////////////////////////////////////////////////
            var res = {}
                // res.data = {};
            res.data = {
                "boundaries": {
                    "boundary": [{
                        "boundaryId": "060855050011",
                        "boundaryType": "USA_BLOCKGROUP",
                        "boundaryRef": "B1"
                    }]
                },
                "themes": {
                    "ageTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Population median age",
                            "description": "",
                            "value": "34.9"
                        }, {
                            "name": "Population adult count",
                            "description": "",
                            "value": "2724"
                        }, {
                            "name": "Population adult median age",
                            "description": "",
                            "value": "40.8"
                        }, {
                            "name": "Population 18 to 19 years",
                            "description": "",
                            "value": "68"
                        }],
                        "rangeVariable": [{
                            "name": "Population count",
                            "description": "Population count for various age groups",
                            "field": [{
                                "value": "380",
                                "description": "Population under 5 years"
                            }, {
                                "value": "294",
                                "description": "Population 5 to 9 years"
                            }, {
                                "value": "202",
                                "description": "Population 10 to 14 years"
                            }, {
                                "value": "181",
                                "description": "Population 15 to 19 years"
                            }, {
                                "value": "152",
                                "description": "Population 20 to 24 years"
                            }, {
                                "value": "253",
                                "description": "Population 25 to 29 years"
                            }, {
                                "value": "402",
                                "description": "Population 30 to 34 years"
                            }, {
                                "value": "432",
                                "description": "Population 35 to 39 years"
                            }, {
                                "value": "356",
                                "description": "Population 40 to 44 years"
                            }, {
                                "value": "235",
                                "description": "Population 45 to 49 years"
                            }, {
                                "value": "208",
                                "description": "Population 50 to 54 years"
                            }, {
                                "value": "180",
                                "description": "Population 55 to 59 years"
                            }, {
                                "value": "170",
                                "description": "Population 60 to 64 years"
                            }, {
                                "value": "107",
                                "description": "Population 65 to 69 years"
                            }, {
                                "value": "72",
                                "description": "Population 70 to 74 years"
                            }, {
                                "value": "44",
                                "description": "Population 75 to 79 years"
                            }, {
                                "value": "26",
                                "description": "Population 80 to 84 years"
                            }, {
                                "value": "19",
                                "description": "Population 85 years and over"
                            }]
                        }]
                    },
                    "genderTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Male population count",
                            "description": "",
                            "value": "1909"
                        }, {
                            "name": "Female population count",
                            "description": "",
                            "value": "1804"
                        }]
                    },
                    "incomeTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Household Median Income $",
                            "description": "",
                            "value": "114661"
                        }, {
                            "name": "Household Average Income $",
                            "description": "",
                            "value": "126136"
                        }],
                        "rangeVariable": [{
                            "name": "% Household income",
                            "description": "Household percentage for various income ranges",
                            "field": [{
                                "value": "0",
                                "description": "Less than $10,000"
                            }, {
                                "value": "0.54",
                                "description": "$10,000 to $14,999"
                            }, {
                                "value": "2.89",
                                "description": "$15,000 to $24,999"
                            }, {
                                "value": "4.61",
                                "description": "$25,000 to $34,999"
                            }, {
                                "value": "8.13",
                                "description": "$35,000 to $49,999"
                            }, {
                                "value": "14.09",
                                "description": "$50,000 to $74,999"
                            }, {
                                "value": "6.87",
                                "description": "$75,000 to $99,999"
                            }, {
                                "value": "31.71",
                                "description": "$100,000 to $149,999"
                            }, {
                                "value": "13.64",
                                "description": "$150,000 to $199,999"
                            }, {
                                "value": "17.52",
                                "description": "$200,000 or more"
                            }]
                        }]
                    },
                    "raceTheme": {
                        "boundaryRef": "B1",
                        "rangeVariable": [{
                            "name": "Race %",
                            "description": "Population percentage by race",
                            "field": [{
                                "value": "26.61",
                                "description": "Population % White alone"
                            }, {
                                "value": "2.29",
                                "description": "Population % Black or African American alone"
                            }, {
                                "value": "0.22",
                                "description": "Population % American Indian and Alaska native alone"
                            }, {
                                "value": "61.81",
                                "description": "Population % Asian alone"
                            }, {
                                "value": "0.13",
                                "description": "Population % native Hawaiian and Opi alone"
                            }, {
                                "value": "4.66",
                                "description": "Population % some other race alone"
                            }]
                        }]
                    },
                    "ethnicityTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Population % two or more races alone",
                            "description": "",
                            "value": "4.28"
                        }, {
                            "name": "Population % hispanic",
                            "description": "",
                            "value": "12.55"
                        }, {
                            "name": "Population % not hispanic",
                            "description": "",
                            "value": "87.45"
                        }]
                    },
                    "maritalStatusTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Population 15 years and over",
                            "description": "",
                            "value": "2837"
                        }],
                        "rangeVariable": [{
                            "name": "% Marital status",
                            "description": "Population percentage based on marital status",
                            "field": [{
                                "value": "27.99",
                                "description": "Population % 15 years and over - Never married"
                            }, {
                                "value": "56.01",
                                "description": "Population % 15 years and over - Now married"
                            }, {
                                "value": "0",
                                "description": "Population % 15 years and over - Separated"
                            }, {
                                "value": "4.09",
                                "description": "Population % 15 years and over - Widowed"
                            }, {
                                "value": "11.91",
                                "description": "Population % 15 years and over - Divorced"
                            }]
                        }]
                    },
                    "automobileTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Expenditure on transportation in $",
                            "description": "",
                            "value": "8238750.7"
                        }, {
                            "name": "Expenditure on vehicle purchase (net outlay) in $",
                            "description": "",
                            "value": "3133701.13"
                        }, {
                            "name": "Expenditure on new cars and trucks in $",
                            "description": "",
                            "value": "1173748.06"
                        }, {
                            "name": "Expenditure on used cars and trucks in $",
                            "description": "",
                            "value": "1912651.03"
                        }],
                        "rangeVariable": [{
                            "name": "Vehicle purchase",
                            "description": "Expenditure on vehicle purchases",
                            "field": [{
                                "value": "681435.48",
                                "description": "Expenditure on new cars in $"
                            }, {
                                "value": "492312.58",
                                "description": "Expenditure on new trucks in $"
                            }, {
                                "value": "894465.09",
                                "description": "Expenditure on used cars in $"
                            }, {
                                "value": "1018185.94",
                                "description": "Expenditure on used trucks in $"
                            }, {
                                "value": "47302.03",
                                "description": "Expenditure on other vehicles in $"
                            }, {
                                "value": "13795.77",
                                "description": "Expenditure on new motorcycles in $"
                            }, {
                                "value": "33506.27",
                                "description": "Expenditure on used motorcycles in $"
                            }]
                        }]
                    },
                    "purchasingBehaviorTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Expenditure on pet purchase, supplies, medicine in $",
                            "description": "",
                            "value": "194044.57"
                        }, {
                            "name": "Expenditure on alcoholic beverages purchased on trips in $",
                            "description": "",
                            "value": "57235.58"
                        }, {
                            "name": "Expenditure on purchase of other vehicle in $",
                            "description": "",
                            "value": "82344.46"
                        }, {
                            "name": "Expenditure on purchase of boat with motor in $",
                            "description": "",
                            "value": "16782.87"
                        }]
                    },
                    "educationalAttainmentTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Population count 25 years and over",
                            "description": "",
                            "value": "2504"
                        }],
                        "rangeVariable": [{
                            "name": "Educational attainment",
                            "description": "Population count based on educational attainment",
                            "field": [{
                                "value": "0",
                                "description": "No schooling completed"
                            }, {
                                "value": "0",
                                "description": "Nursery to 4th grade"
                            }, {
                                "value": "54",
                                "description": "5th and 6th grade"
                            }, {
                                "value": "25",
                                "description": "7th and 8th grade"
                            }, {
                                "value": "14",
                                "description": "9th grade"
                            }, {
                                "value": "0",
                                "description": "10th grade"
                            }, {
                                "value": "0",
                                "description": "11th grade"
                            }, {
                                "value": "25",
                                "description": "12th grade, no diploma"
                            }, {
                                "value": "266",
                                "description": "High school graduate, GED, or alternative"
                            }, {
                                "value": "135",
                                "description": "Some college, less than 1 year"
                            }, {
                                "value": "256",
                                "description": "Some college, 1 or more years, no degree"
                            }, {
                                "value": "347",
                                "description": "Associate's degree"
                            }, {
                                "value": "768",
                                "description": "Bachelor's degree"
                            }, {
                                "value": "558",
                                "description": "Master's degree"
                            }, {
                                "value": "11",
                                "description": "Professional school degree"
                            }, {
                                "value": "45",
                                "description": "Doctorate degree"
                            }]
                        }]
                    },
                    "financialProductsTheme": {
                        "boundaryRef": "B1",
                        "rangeVariable": [{
                            "name": "Household with financial assets $",
                            "description": "Household count with financial assets",
                            "field": [{
                                "value": "0",
                                "description": "$      0 - $  5,000"
                            }, {
                                "value": "4",
                                "description": "$  5,000 - $ 14,999"
                            }, {
                                "value": "79",
                                "description": "$ 15,000 - $ 24,999"
                            }, {
                                "value": "10",
                                "description": "$ 25,000 - $ 34,999"
                            }, {
                                "value": "2",
                                "description": "$ 35,000 - $ 49,999"
                            }, {
                                "value": "17",
                                "description": "$ 50,000 - $ 74,999"
                            }, {
                                "value": "0",
                                "description": "$ 75,000 - $ 99,999"
                            }, {
                                "value": "18",
                                "description": "$100,000 - $149,999"
                            }, {
                                "value": "195",
                                "description": "$150,000 - $249,999"
                            }, {
                                "value": "159",
                                "description": "$250,000 - $499,999"
                            }, {
                                "value": "623",
                                "description": "$500,000 +"
                            }]
                        }]
                    },
                    "commuterPatternsTheme": {
                        "boundaryRef": "B1",
                        "individualValueVariable": [{
                            "name": "Aggregate travel time (in minutes)",
                            "description": "",
                            "value": "47425"
                        }, {
                            "name": "Average travel time (in minutes)",
                            "description": "",
                            "value": "26.9"
                        }],
                        "rangeVariable": [{
                            "name": "Mode of transportation",
                            "description": "Population count by mode of transportation to work",
                            "field": [{
                                "value": "1617",
                                "description": "Car, truck, or van - drove alone"
                            }, {
                                "value": "129",
                                "description": "Car, truck, or van - carpooled"
                            }, {
                                "value": "1",
                                "description": "Public transportation - bus"
                            }, {
                                "value": "0",
                                "description": "Public transportation - streetcar"
                            }, {
                                "value": "10",
                                "description": "Public transportation - subway"
                            }, {
                                "value": "0",
                                "description": "Public transportation - railroad"
                            }, {
                                "value": "0",
                                "description": "Public transportation - ferryboat"
                            }, {
                                "value": "0",
                                "description": "Taxicab"
                            }, {
                                "value": "0",
                                "description": "Motorcycle"
                            }, {
                                "value": "6",
                                "description": "Bicycle"
                            }, {
                                "value": "0",
                                "description": "Walked"
                            }, {
                                "value": "0",
                                "description": "Other means"
                            }]
                        }, {
                            "name": "Travel time",
                            "description": "Population count by travel time to work",
                            "field": [{
                                "value": "54",
                                "description": "Less than 5 minutes"
                            }, {
                                "value": "105",
                                "description": "5 to 9 minutes"
                            }, {
                                "value": "371",
                                "description": "0 to 14 minutes"
                            }, {
                                "value": "303",
                                "description": "15 to 19 minutes"
                            }, {
                                "value": "325",
                                "description": "20 to 24 minutes"
                            }, {
                                "value": "144",
                                "description": "25 to 29 minutes"
                            }, {
                                "value": "238",
                                "description": "30 to 34 minutes"
                            }, {
                                "value": "10",
                                "description": "35 to 39 minutes"
                            }, {
                                "value": "14",
                                "description": "40 to 44 minutes"
                            }, {
                                "value": "88",
                                "description": "45 to 59 minutes"
                            }, {
                                "value": "39",
                                "description": "60 to 89 minutes"
                            }, {
                                "value": "72",
                                "description": "90 or more minutes"
                            }]
                        }]
                    }
                }
            }


            ///////////////////////////////////////////////////////////////////////
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
                $scope.incomeData.push(d.value);
            });
            var education = res.data.themes.educationalAttainmentTheme.rangeVariable[0].field;
            education.forEach(d => {
                $scope.educationLabel.push(d.description);
                $scope.educationData[0].push(d.value);
            });

            var assets = res.data.themes.financialProductsTheme.rangeVariable[0].field;
            assets.forEach(d => {
                $scope.assetsLabel.push(d.description);
                $scope.assetsData.push(d.value);
            });

            var transportation = res.data.themes.commuterPatternsTheme.rangeVariable[0].field;
            transportation.forEach(d => {
                $scope.transportationLabel.push(d.description);
                $scope.transportationData[0].push(d.value);
            });


            var race = res.data.themes.raceTheme.rangeVariable[0].field;
            race.forEach(d => {
                $scope.raceLabel.push(d.description);
                $scope.raceData.push(d.value);
            });

            var marital = res.data.themes.maritalStatusTheme.rangeVariable[0].field;
            marital.forEach(d => {
              $scope.maritalLabel.push(d.description);
              $scope.maritalData[0].push(d.value);
            });

//     }, function(err) {
//         console.log('location not found.');
//     });
// })
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
