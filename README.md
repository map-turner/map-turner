<h1 align="center">
  Tool Usage Mapper
</h1>

## What is this?

This tool was made to display the evolution of locations on a map.

## 🚀 Quick start with demo data

1.  **Get the dependencies.**

    ```shell
    npm install
    ```

1.  **Set your environment variables.**

    Rename `.env.development.sample` to `.env.development` and edit the file as needed.

1.  **Run it!**

    ```shell
    npm run develop
    ```

1.  **Look at the demo data!**

    Open your browser, navigate to `http://localhost:8000/`.
    Play with the slider to see how the locations change over time.

## Display your actual data:

1.  **Warning.**

    You're responsible for the usage you make of this tool.
    Be very careful with the data you will be working with.
    Respect all the applicable laws.

1.  **Requirements.**

    ```shell
    pip install pyarrow pandas
    npm i
    ```

1.  **Set your environment variables.**

    Rename `.env.development.sample` to `.env.development` and fill the form.

1.  **Get the data from myturn.**

    ```shell
    npm run get-data
    ```

1.  **Collect all the files into one.**

    ```shell
    npm run merge-data
    ```

1.  **Download file with postcodes and coordinates.**

    If you're not in the UK, you'll have to do a bit of work here:
    You need to get the longitude and latitude for your zip codes/ postcodes.

    If in the UK, you might want to get a different file here: https://www.getthedata.com/open-postcode-geo
    The default file is massive and will take forever but regional extracts are available.
    Modify `scripts/get_uk_postcodes.sh` accordingly.

    ```shell
    npm run get-uk-postcodes
    ```

1.  **Add coordinates to the collection file.**

    ```shell
    npm run merge-data-and-coord
    ```

1.  **Run it!**

    ```shell
    npm run develop
    ```

1.  **Look at your data!**

    Open your browser, navigate to `http://localhost:8000/`.
    Play with the slider to see your locations change over time.
