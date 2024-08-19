"use client";

import Input from "@/components/Input";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function HomePage() {
  const defaultValues = {
    product: [
      {
        varient: [
          { id: uuidv4(), size: "M", color: "red", price: 100 },
          { id: uuidv4(), size: "L", color: "green", price: 200 },
        ],
      },
      {
        varient: [
          { id: uuidv4(), size: "XL", color: "green", price: 200 },
          { id: uuidv4(), size: "2xl", color: "yellow", price: 400 },
        ],
      },
    ],
  };

  const { control, register, trigger, handleSubmit } = useForm({
    defaultValues,
  });
  const { fields, append, prepend, remove, swap, move, insert, update } =
    useFieldArray({
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "product", // unique name for your Field Array
    });

  console.log("fields => ", fields);

  const handleAddProduct = () => {
    // append in product array
    append({
      varient: [
        { id: uuidv4(), size: "M", color: "red", price: 100 },
        { id: uuidv4(), size: "L", color: "green", price: 200 },
      ],
    });
  };

  const handleAddVarient = (index) => {
    // append in the variant of product array
    update(index, {
      varient: [
        ...fields[index].varient,
        { id: uuidv4(), size: "", color: "", price: "" },
      ],
    });
  };

  const handleRemoveVarient = (index, variantId) => {
    // remove variant from the product array
    update(
      index,
      {
        varient: fields[index].varient.filter(
          (variant) => variant.id !== variantId
        ),
      },
      { shouldDirty: false }
    );
  };

  const handleFormSubmit = () => {
    console.log("fields => ", fields);
  };

  // console.log("fields", fields);

  return (
    <form>
      {fields.map((field, index) => {
        return (
          <div key={field.id}>
            <div className="border border-gray-400 m-6 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold">Product: #{index + 1}</h2>

              {/* list of size, color, quanitty */}
              {field.varient.map((variant, variantIndex) => {
                console.log("variant => ", variant);
                return (
                  <div key={variant.id}>
                    <span>
                      <Controller
                        control={control}
                        name={`product[${index}].varient[${variantIndex}].size`}
                        rules={{ required: "Size is required" }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                          <Input
                            error={error}
                            placeholder="Size"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name={`product[${index}].varient[${variantIndex}].color`}
                        rules={{ required: "Color is required" }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                          <Input
                            error={error}
                            placeholder="Color"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name={`product[${index}].varient[${variantIndex}].price`}
                        rules={{ required: "Price is required" }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                        }) => (
                          <Input
                            error={error}
                            placeholder="Price"
                            onChange={onChange}
                            value={value}
                          />
                        )}
                      />

                      <button
                        onClick={() => {
                          handleRemoveVarient(index, variant.id);
                        }}
                      >
                        X
                      </button>
                    </span>
                  </div>
                );
              })}

              <button
                onClick={() => {
                  handleAddVarient(index);
                }}
              >
                Add Variant
              </button>
            </div>
          </div>
        );
      })}

      <button type="button" className="ml-6 mr-2" onClick={handleAddProduct}>
        Add Product
      </button>

      {/* submit */}
      <button onClick={handleSubmit(handleFormSubmit)}>Submit</button>
    </form>
  );
}
