// 'use strict';
//
// module.exports = (app) => {
//   const Place = app.models.Place;
//
//   Place.create([
//     {
//       title: "Golden Coffee",
//       address: {
//         addressLine1: "ул. М. Богдановича, 26",
//         city: "Минск",
//         state: "Минская область",
//         country: "Беларусь",
//         isoCountry: "BY"
//       },
//       location: {
//         latitude: 53.915910,
//         longitude: 27.563703,
//       },
//       description: "Круглосуточное кафе с панорамной террасой, которая работает весь год. Это место тусовок и вечеринок ночь напролет. Это живая музыка по пятницам и субботам. Это европейская и паназиатская кухня, ланчи и завтраки, большое коктейльное меню.",
//       workingHours: [
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         },
//         {
//           allDay: true,
//         }
//       ],
//       images: [
//         "https://static.relax.by/images/common/galleries/510172/0746708c95e00933704788d65f8c86af.jpg",
//         "https://static.relax.by/images/common/galleries/510172/a693254016afb4f2d41d08ed00e0601d.jpg",
//         "https://static.relax.by/images/common/galleries/510172/dace2ceff3ebb1683016a773982630e0.jpg"
//       ]
//     },
//     {
//       title: "Кофевариум",
//       address: {
//         addressLine1: "ул. Мясникова, 29",
//         city: "Минск",
//         state: "Минская область",
//         country: "Беларусь",
//         isoCountry: "BY"
//       },
//       location: {
//         latitude: 53.898301,
//         longitude: 27.544701,
//       },
//       description: "«Кофевариум» – атмосферная городская кофейня формата casual с оригинальными авторскими напитками и едой. Сюда можно не только забежать на кофе с друзьями, но и сытно позавтракать, например. В «Кофевариуме» решили все напитки и все блюда готовить сами на собственной кухне, не используя никаких готовых полуфабрикатов.",
//       workingHours: [
//         {
//           from: "08:00",
//           till: "21:00"
//         },
//         {
//           from: "08:00",
//           till: "21:00"
//         },
//         {
//           from: "08:00",
//           till: "21:00"
//         },
//         {
//           from: "08:00",
//           till: "21:00"
//         },
//         {
//           from: "08:00",
//           till: "21:00"
//         },
//         {
//           from: "10:00",
//           till: "21:00"
//         },
//         {
//           from: "10:00",
//           till: "21:00"
//         }
//       ],
//       images: [
//         "https://static.relax.by/images/common/galleries/10613185/cd64eea50a9221536a7c8c4d7aff05d2.jpg",
//         "https://static.relax.by/images/common/galleries/10613185/698dc4e13471a91a86814fe56999fd5c.jpg",
//         "https://static.relax.by/images/common/galleries/10613185/1dfd19c2bca61b81474cb6fcdb3ee871.jpg"
//       ]
//     },
//     {
//       title: "Пахлава",
//       address: {
//         addressLine1: "ул. Кирова, 4",
//         city: "Минск",
//         state: "Минская область",
//         country: "Беларусь",
//         isoCountry: "BY"
//       },
//       location: {
//         latitude: 53.892582,
//         longitude: 27.552260,
//       },
//       description: "«Пахлава» — кофейня формата take away с отличным кофе, азербайджанскими сладостями и авторскими сэндвичами. Это смесь Востока и Запада всего в нескольких шагах от железнодорожного вокзала.",
//       workingHours: [
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         },
//         {
//           from: "10:00",
//           till: "23:00"
//         }
//       ],
//       images: [
//         "https://static.relax.by/images/common/galleries/10626585/d1b71b0772afcbf8515f1246aca13bda.jpg",
//         "https://static.relax.by/images/common/galleries/10626585/39b4324e2de79881d13742856268a162.jpg",
//         "https://static.relax.by/images/common/galleries/10626585/bf4c36c383e93fc168ce4185d56a6a66.jpg"
//       ]
//     },
//     {
//       title: "Sherlock coffee Hall",
//       address: {
//         addressLine1: "пер. Михайловский, 4",
//         city: "Минск",
//         state: "Минская область",
//         country: "Беларусь",
//         isoCountry: "BY"
//       },
//       location: {
//         latitude: 53.893890,
//         longitude: 27.551227
//       },
//       description: "Воссоздать атмосферу того самого дома на Бейкер-стрит 221Б было одной из главных задач для создателей кофейни Sherlock coffee hall. Здесь можно расположиться на мягких диванах или креслах у камина и забыть, что вы в общественном месте. Ведь в углу комнаты стоит рояль, на одной из стен висит скрипка Шерлока, а на полках – полно детективных книг. Но все же это кофейня, так что без кофеина и глюкозы, стимуляторов мозговой активности, никуда – чай, кофе и десерты прилагаются. Так же алкогольная карта.",
//       workingHours: [
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         }
//       ],
//       images: [
//         "https://static.relax.by/images/common/galleries/10551695/d26888416a03f4d8ab059b6a9ba4f49d.jpg",
//         "https://static.relax.by/images/common/galleries/10551695/0c80a343a631949de33bb242841eb85c.jpg",
//         "https://static.relax.by/images/common/galleries/10551695/497befb357b965127ee1471cda12af89.jpg"
//       ]
//     },
//     {
//       title: "Кофейная Лаборатория",
//       address: {
//         addressLine1: "ул. Я. Коласа, 8",
//         city: "Минск",
//         state: "Минская область",
//         country: "Беларусь",
//         isoCountry: "BY"
//       },
//       location: {
//         latitude: 53.919153,
//         longitude: 27.586925
//       },
//       description: "Как только попадаешь в интерьер кофейни, то сразу понимаешь, что создатели вдохновлялись культовым сериалом «Во все тяжкие». Столы оформлены прямо на жестяных бочках, а одну из стен украшает портрет главного героя сериала — Уолтера Уайта. Тут же цитата — «Варим во все чашки».",
//       workingHours: [
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         },
//         {
//           from: "08:00",
//           till: "23:00"
//         }
//       ],
//       images: [
//         "https://static.relax.by/images/common/wysiwyg/2016/09/fa077b048b6b5d8715460d5c0d7ef30a.jpg",
//         "https://static.relax.by/images/common/wysiwyg/2016/09/74dce5c58f8c1c4d86451ea9856b5ea9.jpg",
//         "https://static.relax.by/images/common/wysiwyg/2016/09/23cf66773a0ebe3fa4517975d6d09abe.jpg"
//       ]
//     }
//   ]);
// };
