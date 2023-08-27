import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constants.js";
import Todo from "../models/Todo.js";

export const EditTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Todo desc is required",
        errors.mapped()
      )
    );
  }

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.todo_id,
        userId: req.userId,
      },
      {
        desc: req.body.desc, // Updated description
      },
      {
        new: true, // Return the updated todo
      }
    );

    if (updatedTodo) {
      return res.json(
        jsonGenerate(StatusCode.SUCCESS, "Todo updated successfully", updatedTodo)
      );
    } else {
      return res.json(
        jsonGenerate(
          StatusCode.UNIPROCESSABLE_ENTITY,
          "Could not update the todo",
          null
        )
      );
    }
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNIPROCESSABLE_ENTITY, "Could not update", null)
    );
  }
};
