# Administration-Table

[日本語](../../README.md) | English

A Google Apps Script-based management table automation project.

Manages "To-Do Lists" in spreadsheets and provides notification functionality via LINE Messaging API.

## 📋 Project Overview

This project provides the following features:

- **To-Do List Management**: Track monthly task progress
- **Automatic Notifications**: Weekly notifications for incomplete tasks (LINE Messaging API)
- **Progress Calculation**: Automatic calculation of average task progress rate
- **Reset Functionality**: Reset monthly task progress
- **Edit History**: Record spreadsheet change history

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Google Account
- LINE Messaging API Account (if using notification functionality)

### 1. Clone the Repository

```bash
git clone <repository-url> administration-table
cd administration-table
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Enable Google Apps Script API

1. Access the [Google Apps Script Settings Page](https://script.google.com/home/usersettings)
2. Enable "Google Apps Script API"

### 4. Login to clasp

```bash
npx clasp login
```

### 5. Project Configuration

Ensure the `.clasp.json` file is properly configured:

```json
{
  "scriptId": "YOUR_SCRIPT_ID",
  "rootDir": "."
}
```

### 6. LINE Messaging API Token Configuration

1. Generate a channel access token at [LINE Developers Console](https://developers.line.biz/)
2. Set the token in Google Apps Script's Properties Service

### 7. Deploy the Project

```bash
npx clasp push
```

## 📁 File Structure

```markdown
administration-table/
├── appsscript.json         # Apps Script configuration
├── changeAverage.js        # Progress rate calculation functionality
├── constants.js            # Constants management
├── menu.js                 # Custom menu
├── notification.js         # LINE notification functionality
├── onEdit.js               # Edit history recording
├── resetTasks.js           # Task reset functionality
├── utils.js                # Common utility functions
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## 🔧 Feature Details

### 1. Automatic Progress Calculation (`changeAverage.js`)

- Monitors values in the "Progress" column of the spreadsheet
- Displays average progress rate as "Content (XX%)"

### 2. LINE Notifications (`notification.js`)

- Sends notifications for incomplete tasks every Monday at 7-8 AM
- Extracts tasks with progress less than 100% and sends them via LINE Messaging API

### 3. Task Reset (`resetTasks.js`)

- Resets monthly task progress to "0%"
- Includes confirmation dialog

### 4. Edit History (`onEdit.js`)

- Automatically records spreadsheet changes
- Tracks changer, change content, and timestamp

## ⚙️ Configuration

### Trigger Settings

Set up the following triggers in Google Apps Script:

1. **Weekly Notification**: `notificationUncompletedTasks` function
   - Frequency: Weekly
   - Day: Monday
   - Time: 7:00-8:00

2. **On Edit Execution**: `changeAverage` function
   - Frequency: On edit

### Spreadsheet Requirements

- Sheet name: "やることリスト（毎月）" (Monthly To-Do List)
- Required columns: "内容" (Content), "進捗" (Progress)
- Progress column values: 0-1 numeric values (0=0%, 1=100%)

## 🔒 Security

- LINE Messaging API tokens are managed via PropertiesService
- `.clasprc.json` is included in `.gitignore`
- Do not write sensitive information directly in code
