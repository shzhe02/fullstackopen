```mermaid
sequenceDiagram

note over browser: note is created in JSON format and added to existing JSON data fetched from server
note over browser: notes list is rerendered
browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server-->>browser: code 201 created
```
