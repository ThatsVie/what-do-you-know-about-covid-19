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
if df["URL"].isnull().any() or not df["URL"].str.startswith(("http://", "https://")).all():
    errors.append("Invalid or missing 'URL' in some rows.")

# Ensure summaries are not truncated
if df["Summary"].str.endswith("...").any():
    print("Warning: Some summaries are truncated. Consider reviewing the source articles.")

# Check for invalid or missing Titles
if df["Title"].isnull().any():
    errors.append("Missing 'Title' in some rows.")

# Check for missing Authors
if df["Author(s)"].isnull().any():
    print("Missing 'Author(s)' in some rows. Filling with 'Unknown'.")
    df["Author(s)"].fillna("Unknown", inplace=True)

# Check for invalid Year
if df["Year"].isnull().any() or not df["Year"].apply(lambda x: str(x).isdigit()).all():
    errors.append("Invalid 'Year' in some rows (must be a 4-digit number).")

# Check for invalid Date Published
try:
    df["Date Published"] = pd.to_datetime(df["Date Published"], errors="coerce")
    if df["Date Published"].isnull().any():
        errors.append("Invalid or missing 'Date Published' in some rows.")
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
