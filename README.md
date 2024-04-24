<h1 align="center">
  Tool Usage Mapper
</h1>

## What is this?

This was made to display locations on a map.
It was a good excuse to try working with Gatsby and Leaflet.

## 🚀 Quick start

1.  **Set your environment variables.**

    Rename `.env.sample` to `.env` and fill the form.

    Get csv file, call it `postcodes.csv` and put it in `src/data`
    It should have the following columns:

    ```csv
    Count_sum,postcode,latitude,longitude
    ```

2.  **Get the dependencies.**

    ```shell
    npm i
    ```

3.  **Get the data from myturn.**

    ```shell
    npm run get-data
    ```

4.  **Merge all the files into one.**

    ```shell
    npm run merge-data
    ```

5.  **Run it!**

    ```shell
    npm run develop
    ```
