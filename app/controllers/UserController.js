import { HttpRequest } from '../services/http';
import { URL } from '../config/url';

export const UserController = {
  request: {
    profile: () => HttpRequest.get(URL.USER.PROFILE),
  },

  rating: (ratings) => {
    const rate = {
      total: 0,
      average: 0,
      count: 0,
    };
    let rates = 0;
    rate.count = ratings.length;

    for (let i = 0; i < ratings.length; i++) {
      rates += ratings[i].rate;
    }

    rate.average = Math.round((rates / rate.count) * 10) / 10;
    rate.total = rates;

    return rate;
  },

  exchangeRate: (success) => {
    HttpRequest.get('http://rate-exchange-1.appspot.com/currency?from=SGD&to=PHP')
    .then(response => {
      console.log('Exchange Rate', response.data)
      success(response);
    })
    .catch(e => {
      console.log(e);
    });
  }
};
