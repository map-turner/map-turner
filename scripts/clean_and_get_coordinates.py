import pandas as pd

def clean_postcodes(df):

    # clean postcodes
    df = df.drop(columns=['Amount'])
    df = df.rename(columns={'Value': 'postcode_no_space'})
    df['postcode_no_space'] = df['postcode_no_space'].str.upper()
    df['postcode_no_space'] = df['postcode_no_space'].str.replace(" ", "", case=False, regex=False)
    df = df.dropna(subset=['postcode_no_space'])

    # get clean dates
    df['Filename'] = df['Filename'].str.replace("data/|.csv", "", case=False, regex=True)
    loc_0 = df.columns.get_loc('Filename')
    df_split = df['Filename'].str.split(pat='-to-', expand=True).add_prefix('Filename_')
    df = pd.concat([df.iloc[:, :loc_0], df_split, df.iloc[:, loc_0:]], axis=1)
    df = df.drop(columns=['Filename'])
    df = df.rename(columns={'Filename_0': 'start_date'})
    df = df.rename(columns={'Filename_1': 'end_date'})
    df = df.astype({'start_date': 'datetime64[ns]'})
    df = df.astype({'end_date': 'datetime64[ns]'})

    # aggregation grouped on columns
    df = df.groupby(['postcode_no_space', 'start_date', 'end_date']).agg(Count_sum=('Count', 'sum')).reset_index()
    return df

def drop_extra_columns(df: pd.DataFrame):
    df = df.drop(columns=['usertype', 'status', 'easting','northing', 'positional_quality_indicator', 'country', 'postcode_fixed_width_seven', 'postcode_fixed_width_eight', 'postcode_area', 'postcode_district', 'postcode_sector', 'outcode' , 'incode'])
    return df

def remove_postcode_no_space(df: pd.DataFrame):
    # df = df.drop(columns=['id'])
    df = df.drop(columns=['postcode_no_space'])
    df = df.sort_values(['postcode'], na_position='first')
    return df

df_ltl = pd.read_csv(r'data/collection.csv', engine='pyarrow')

df_ltl_clean = clean_postcodes(df_ltl.copy())

# Loaded variable 'df' from URI: /home/damien/projects/LTL_data/ukpostcodes.csv
df_postcode = pd.read_csv(r'postcodes.csv', engine='pyarrow')

df_postcode_clean = drop_extra_columns(df_postcode.copy())


def merge_tables(df_tools, df_codes):
	return pd.merge(df_tools, df_codes, on='postcode_no_space', how='inner')

df_merged = merge_tables(df_ltl_clean , df_postcode_clean.copy())

df_final = remove_postcode_no_space(df_merged.copy())

df_final.to_csv(r'src/data/postcodes.csv', index=False)
