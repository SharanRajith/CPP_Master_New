$body = @{
  language = "cpp"
  version = "*"
  files = @(@{ name = "main.cpp"; content = "#include<iostream>`nusing namespace std;`nint main(){cout<<`"Hello from local g++!`"<<endl;return 0;}" })
} | ConvertTo-Json -Depth 5

$response = Invoke-RestMethod -Method POST -Uri "http://localhost:2000/api/v2/piston/execute" -Body $body -ContentType "application/json"
Write-Output "STDOUT: $($response.run.stdout)"
Write-Output "STDERR: $($response.run.stderr)"
Write-Output "EXIT:   $($response.run.code)"
