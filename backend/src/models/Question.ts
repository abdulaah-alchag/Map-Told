import { Schema, model, type InferSchemaType } from "mongoose";
//import {Zone} from "#models"

const questionSchema = new Schema(
  {
    zoneId: {
      type: Schema.Types.ObjectId,
      ref: 'Zone',
      required: [true, 'Zone ID is required']
    },
    question: {
      type: String,
      required: [true, "question is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export default model("Question", questionSchema);
