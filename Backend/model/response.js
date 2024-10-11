import { query } from "express";
import mongoose from "mongoose";

const resposeSchema = mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  summary: String,
  result_text: String,
  result_table_path: String,
  result_visualization_path: String,
  error: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.model("Response", resposeSchema);
export default Response;
