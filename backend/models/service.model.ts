import {Document, Schema, model} from "mongoose";

interface serviceTypes extends Document {
    alt: string;
    title: string;
    text: string;
    price: number | string;
    duration?: number | string;
  };
  
  const serviceSchema = new Schema<serviceTypes>({
    title: { type: String, required: true, trim: true, unique: true },
    text: { type: String, required: true, trim: true },
    alt: { type: String, required: true, trim: true },
    price: { type: Schema.Types.Mixed, required: true, default: 0 },
    duration: { type: Schema.Types.Mixed },
  }, { timestamps: true });

const Service = model<serviceTypes>("Service", serviceSchema);

export default Service;