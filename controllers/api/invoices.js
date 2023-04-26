const Invoice = require('../../models/invoice');
const User = require('../../models/user');

const dataController = {
  async create(req, res, next) {
    try {
      console.log(req.body);
      const user = await User.findById(req.params.userId);

      const createdInvoice = await Invoice.create(req.body);

      let updatedInvoice = await Invoice.findByIdAndUpdate(createdInvoice._id, [
        // {
        //   $set: {
        //     dueDate: {
        //       $dateAdd: {
        //         startDate: '$createdAt',
        //         unit: 'day',
        //         amount: '$paymentTerm'
        //       }
        //     }
        //   }
        // },
        {
          $set: {
            items: {
              $map: {
                input: '$items',
                as: 'total',
                in: {
                  id: '$$total.id',
                  itemName: '$$total.itemName',
                  quantity: '$$total.quantity',
                  price: '$$total.price',
                  total: {
                    $multiply: ['$$total.price', '$$total.quantity']
                  }
                }
              }
            }
          }
        },
        {
          $set: {
            invoiceTotal: {
              $sum: '$items.total'
            }
          }
        }
      ]);

      const updatedDateInvoice = await Invoice.findById(createdInvoice._id);
      user.invoices.addToSet(createdInvoice._id);
      user.save();
      res.locals.data.invoice = updatedDateInvoice;
      res.locals.data.user = user;

      next();
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  },
  index(req, res, next) {
    Invoice.find({}, (err, foundInvoices) => {
      if (err) {
        console.error(err);
        res.status(400).error(err);
      } else {
        res.locals.data.invoices = foundInvoices;
        next();
      }
    });
  },

  show(req, res, next) {
    Invoice.findById(req.params.id, (err, foundInvoice) => {
      if (err) {
        console.error(err);
        res.status(400).json(err);
      } else {
        res.locals.data.invoice = foundInvoice;
        next();
      }
    });
  },
  destroy(req, res, next) {
    Invoice.findByIdAndDelete(req.params.id, (err, deletedInvoice) => {
      if (err) {
        console.error(err);
        res.status(400).error(err);
      } else {
        res.locals.data.invoice = deletedInvoice;
        next();
      }
    });
  },
  async update(req, res, next) {
    try {
      console.log('update invoice log');
      console.log(req.body);
      await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });

      await Invoice.findByIdAndUpdate(req.params.id, [
        {
          $set: {
            dueDate: {
              $dateAdd: {
                startDate: '$createdAt',
                unit: 'day',
                amount: '$paymentTerm'
              }
            }
          }
        },
        {
          $set: {
            items: {
              $map: {
                input: '$items',
                as: 'total',
                in: {
                  itemName: '$$total.itemName',
                  quantity: '$$total.quantity',
                  price: '$$total.price',
                  total: {
                    $multiply: ['$$total.price', '$$total.quantity']
                  }
                }
              }
            }
          }
        },
        {
          $set: {
            invoiceTotal: {
              $sum: '$items.total'
            }
          }
        }
      ]);

      const updatedInvoice = await Invoice.findById(req.params.id);
      res.locals.data.invoice = updatedInvoice;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
};

const apiController = {
  index(req, res) {
    res.json(res.locals.data.invoices);
  },
  show(req, res) {
    res.json(res.locals.data.invoice);
  }
};

module.exports = {
  apiController,
  dataController
};

// const createInvoiceId = () => {
//   let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//     firstLtr = letters[Math.floor(Math.random() * letters.length)],
//     secondLtr = letters[Math.floor(Math.random() * letters.length)],
//     num = () => {
//       let nums = Math.floor(8999 * Math.random()) + 1e3;
//       return nums;
//     };

//   return firstLtr + secondLtr + num();
// };

const createInvoiceId = () => {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    pickLetter = () => {
      let letter = letters[Math.floor(Math.random() * letters.length)];
      return letter;
    },
    pickNum = Math.floor(8999 * Math.random()) + 1e3;

  return pickLetter() + pickLetter() + pickNum;
};

const today = new Date().toLocaleDateString('en-us', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
});
