<h1 align="center">
  Tool Usage Mapper
</h1>

## What is this?

This tool was made to display the evolution of locations on a map.
It was a good excuse to try working with Gatsby and Leaflet.

## 🚀 Quick start

1.  **Requirements.**

    ```shell
    pip install pyarrow pandas
    npm i
    ```

1.  **Set your environment variables.**

    Rename `.env.sample` to `.env` and fill the form.

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

    Open your browser, navigate to `http://localhost:8000/maps`.
    Play with the slider to see your locations change over time.
