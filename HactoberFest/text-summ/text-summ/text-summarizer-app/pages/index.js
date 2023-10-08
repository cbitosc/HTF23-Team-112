import { useState } from "react";
export default function Home() {
  const exampleText = ``;
  const [text, setText] = useState(exampleText);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make a POST request to your Flask server
    try {
      const response = await fetch("http://127.0.0.1:8080/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.input_text);
        setText(data.input_text);
        setResponse(data.summary);

        console.log(data.summary); // Log the response to the console
      } else {
        // Handle error
        console.error("Failed to summarize text.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleClassify = async (e) => {
    e.preventDefault();

    // Make a POST request to your Flask server
    try {
      const response = await fetch("http://127.0.0.1:8080/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.input_text);
        setText(data.input_text);
        setResponse(data.summary);

        console.log(data.summary); // Log the response to the console
      } else {
        // Handle error
        console.error("Failed to summarize text.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleSubmitpdf = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", text); // Assuming you have a Flask route that accepts a "file" parameter

      const response = await fetch("http://127.0.0.1:8080/api/upload-pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResponse(data.summary);
        console.log(data.summary);
      } else {
        console.error("Failed to summarize text.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setText(file);
  };

  return (
    <div className="flex flex-col md:px-12 px-4 bg-background font-poppins min-h-screen">
      <div className="md:w-2/5 w-full">
        <div className="flex flex-col items-center">
          <h1 className="md:text-6xl text-4xl font-bold text-primary mt-10">
            Text <span className="text-active">Summarizer</span>
          </h1>

          <h2 className="text-primary text-2xl font-light mt-6">
            Summarie your text into a shorter length.
          </h2>
        </div>
        <br />
        <br />
        <br />
        <div className="md:w-2/5 md: mt-30 mr-12 w-full">
          <div>
            <label htmlFor="file" className="text-sm font-medium text-primary">
              Upload a PDF file
            </label>
            <div className="mt-2">
              <input
                type="file"
                accept=".pdf"
                name="file"
                id="file"
                className="focus:outline-none w-full"
                onChange={handleFileChange} // Add this line to call handleFileChange on file selection
              />
            </div>
          </div>

          <div className="md:w-2/5 w-full mt-8">
            {/* Added mt-8 for some margin */}
            <button
              className="w-full rounded-lg px-5 py-3 bg-active font-bold text-background hover:bg-primary"
              onClick={handleSubmitpdf}
            >
              SUBMIT
            </button>

            {/* Add a button to trigger the handleSubmitpdf function */}
          </div>
        </div>
      </div>

      <div className="md:w-2/5 w-full mt-8">
        {" "}
        {/* Added mt-8 for some margin */}
      </div>

      <form className="flex md:flex-row flex-col justify-between mt-20 w-full">
        <div className="md:w-2/5 w-full">
          <label htmlFor="text" className=" text-sm font-medium text-primary">
            Enter your text
          </label>
          <div className="mt-2">
            <textarea
              rows={14}
              name="text"
              id="text"
              className="focus:outline-none focus:ring-4 w-full focus:ring-active text-base p-4 rounded-md"
              defaultValue={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:mt-0 mt-4">
          <button
            className="w-full rounded-lg px-5 py-3 mb-3 bg-active font-bold text-background hover:bg-primary sm:px-10"
            type="submit"
            value="SUMMARIZE"
            onClick={handleSubmit}
          >
            SUMMARIZE
          </button>
          <button
            className="w-full rounded-lg px-5 py-3 bg-active font-bold text-background hover:bg-primary sm:px-10"
            type="submit"
            value="SUMMARIZE"
            onClick={handleClassify}
          >
            CLASSIFY
          </button>
        </div>

        <div className="md:w-2/5 md:mt-0 mt-4 w-full">
          <label
            htmlFor="summary"
            className=" text-sm font-medium text-primary"
          >
            Summarized text
          </label>
          <div className="mt-2">
            <textarea
              readOnly
              type="text"
              rows={14}
              name="summary"
              id="summary"
              className="focus:outline-none focus:ring-4 w-full focus:ring-active text-base p-4 rounded-md"
              value={response}
            />
          </div>
        </div>
      </form>

      <div className="mt-20 mb-2 opacity-70 text-center">
        <p className="text-primary text-xs">
          Made by Pixel Pioneers <br />
          <a
            className="hover:text-active"
            href="https://github.com/Sricharan2k3"
          >
            GitHUb
          </a>
        </p>
      </div>
    </div>
  );
}
