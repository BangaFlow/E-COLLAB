import mongoose from "mongoose";
import { number } from "joi";

const quizSchema = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
      },
    ],
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skill",
    },
    time: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const Quiz = mongoose.model("quiz", quizSchema);

export default Quiz;
