import pandas as pd
import os

# Path to your CSV file
csv_path = "data/covid19articles.csv"

# Check if file exists
if not os.path.exists(csv_path):
    print(f"Error: File not found at {csv_path}")
    exit()

# Load the CSV file
try:
    df = pd.read_csv(csv_path)
    print("CSV loaded successfully!")
except Exception as e:
    print(f"Error loading CSV: {e}")
    exit()

# Validate and clean the CSV data
print("Validating CSV data...\n")
errors = []

# Add the "Year" column
if "Year" not in df.columns:
    print("Adding missing 'Year' column...")
    try:
        # Extract year from "Date Published"
        df["Year"] = pd.to_datetime(df["Date Published"], errors="coerce").dt.year

        # Rearrange columns to place "Year" after "Date Published"
        cols = list(df.columns)
        date_index = cols.index("Date Published")
        cols.insert(date_index + 1, cols.pop(cols.index("Year")))
        df = df[cols]
    except Exception as e:
        errors.append(f"Error extracting 'Year': {e}")

# Clean and validate individual fields
def clean_string(value):
    """Remove unnecessary quotation marks and strip whitespace."""
    if pd.isnull(value):
        return None
    return str(value).strip().strip('"').strip("'")

# Apply cleaning to all string columns
for col in df.select_dtypes(include=["object"]).columns:
    df[col] = df[col].apply(clean_string)

# Validate URLs
invalid_urls = df[~df["URL"].str.startswith(("http://", "https://"), na=False)]
if not invalid_urls.empty:
    errors.append(f"Invalid or missing 'URL' in rows: {invalid_urls.index.tolist()}")

# Ensure summaries are not truncated
truncated_summaries = df[df["Summary"].str.endswith("...", na=False)]
if not truncated_summaries.empty:
    print(f"Warning: Some summaries appear truncated in rows: {truncated_summaries.index.tolist()}")

# Check for invalid or missing Titles
missing_titles = df[df["Title"].isnull()]
if not missing_titles.empty:
    errors.append(f"Missing 'Title' in rows: {missing_titles.index.tolist()}")

# Check for missing Authors
missing_authors = df[df["Author(s)"].isnull()]
if not missing_authors.empty:
    print(f"Missing 'Author(s)' in rows: {missing_authors.index.tolist()}. Filling with 'Unknown'.")
    df["Author(s)"].fillna("Unknown", inplace=True)

# Check for invalid Year
invalid_years = df[~df["Year"].apply(lambda x: str(x).isdigit() if pd.notnull(x) else False)]
if not invalid_years.empty:
    errors.append(f"Invalid 'Year' in rows: {invalid_years.index.tolist()}")

# Check for invalid Date Published
try:
    df["Date Published"] = pd.to_datetime(df["Date Published"], errors="coerce")
    invalid_dates = df[df["Date Published"].isnull()]
    if not invalid_dates.empty:
        errors.append(f"Invalid or missing 'Date Published' in rows: {invalid_dates.index.tolist()}")
except Exception as e:
    errors.append(f"Error parsing 'Date Published': {e}")

# Output results
if errors:
    print("Found the following issues in the CSV:")
    for error in errors:
        print(f"- {error}")
else:
    print("No issues found in the CSV.")

# Save a cleaned version of the CSV with consistent quoting
cleaned_csv_path = "data/covid19articles_cleaned.csv"
try:
    df.to_csv(cleaned_csv_path, index=False, quoting=1)  # quoting=1 ensures all fields are quoted
    print(f"Cleaned CSV saved at {cleaned_csv_path}")
except Exception as e:
    print(f"Error saving cleaned CSV: {e}")
