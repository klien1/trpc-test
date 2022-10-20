import Input from "./Input.component";
import { CHOICE_ARRAY, CHOICE_A, CHOICE_B, CHOICE_C } from "../constants";
import { useState } from "react";
import { trpc } from '../utils/trpc';

const initalFormState = {
  [CHOICE_A]: '',
  [CHOICE_B]: '',
  [CHOICE_C]: ''
}

type FormData = {
  [CHOICE_A]: string,
  [CHOICE_B]: string,
  [CHOICE_C]: string
}

const CourseForm = () => {
  const [formData, setFormData] = useState<FormData>(initalFormState)
  const [isValidForm, setIsValidForm] = useState(true);
  const [isSubmiting, setIsSubmitting] = useState(false);
  const addCourses = trpc.useMutation(['postCourse']);


  const handleChange = (newData: object) => {
    setFormData(prevData => {
      return {
        ...prevData, ...newData
      }
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    let containsCalculus = false;
    const calculusRegEx = /^calculus$/i;
    for (const choice of Object.values(formData)) {
      if (choice.match(calculusRegEx)) {
        containsCalculus = true;
      }
    }

    if (containsCalculus) {
      await addCourses.mutateAsync(formData);
      setFormData(initalFormState)
    }

    setIsValidForm(containsCalculus);
    setIsSubmitting(false)
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="border-2 border-spacing-1 p-16 shadow-m rounded-lg">
        <h2 className="text-3xl mb-16 font-bold">Please enter up to 3 courses</h2>
        <form className="w-full max-w-sm flex flex-col justify-center items-center" onSubmit={(e) => handleSubmit(e)}>
          {
            CHOICE_ARRAY.map(choice =>
              <Input
                key={choice}
                label={`Choice ${choice[choice.length - 1]}`}
                name={choice}
                onChange={(event) => handleChange({ [choice]: event.target.value })}
                value={formData[choice as keyof FormData]}
              />
            )
          }
          <div className="text-red-600 font-bold" style={{ visibility: isValidForm ? 'hidden' : undefined }}>Please include "calculus" as one of the courses</div>
          <button
            disabled={isSubmiting}
            className="mt-4 w-1/3 shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CourseForm;