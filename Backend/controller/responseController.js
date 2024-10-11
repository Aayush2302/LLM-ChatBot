import express from "express";
import Response from "../model/response.js";

const saveResponse = async (req, res) => {
  try {
    const newResponse = new Response(req.body);
    const savedResponse = await newResponse.save();
    res.status(200).json(savedResponse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
