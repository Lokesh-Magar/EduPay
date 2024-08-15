// models/model.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IYourModel extends Document {
  name: string;
  email: string;
}

const YourSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.models.YourModel || mongoose.model<IYourModel>('YourModel', YourSchema);
