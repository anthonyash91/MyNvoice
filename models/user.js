const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    logo: {
      type: String,
      default:
        'https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-512x488-rddkk3u9.png'
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    userCompany: {
      type: String,
      required: true
    },
    userAddress: {
      userStreet: { type: String, required: true },
      userCity: { type: String, required: true },
      userState: { type: String, required: true },
      userZipCode: { type: String, required: true }
    },
    password: {
      type: String,
      trim: true,
      minLength: 3,
      required: true
    },
    invoices: [{ type: Schema.Types.ObjectId, ref: 'Invoice' }]
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = model('User', userSchema);
