function ValidateNodeModules {
    $projects = [System.Collections.Generic.List[string]]@("/server", "/client")
    foreach ($project in $projects) {
        $dir = "." + $project + "/node_modules"
        if (-Not (Test-Path -Path $dir)) {
            Write-Host "Instalando dependencias en " + $project
            $dir = "." + $project
            $out = Set-Location $dir && npm install && Set-Location ..
            Write-Host "Las dependencias fueron instaladas`n"
        
        }
        else {
            Write-Host ("Dependencias en " + $project + " están satisfechas")
        }
    }
    Write-Host ""
}

ValidateNodeModules

Write-Host "Levantando servidor..."
$out = Start-Job -Name "CRMProductosServer" -ScriptBlock {
    Set-Location "./server" && npm run dev
}
Start-Sleep -Seconds 15
Write-Host "Servidor vivito y coleando en http://localhost:4000`n"

Write-Host "Levantando cliente..."
$out = Start-Job -Name "CRMProductosClient" -ScriptBlock {
    Set-Location "./client" && npm run dev
}
Start-Sleep -Seconds 10
Write-Host "Listo. Ahora puedes acceder a la aplicación en tu navegador. Usa este link: http://localhost:5173`n"


# Change the default behavior of CTRL-C so that the script can intercept and use it versus just terminating the script.
[Console]::TreatControlCAsInput = $True
# Sleep for 1 second and then flush the key buffer so any previously pressed keys are discarded and the loop can monitor for the use of
#   CTRL-C. The sleep command ensures the buffer flushes correctly.
Start-Sleep -Seconds 1
$Host.UI.RawUI.FlushInputBuffer()
 
# Continue to loop while there are pending or currently executing jobs.
$PendingJobs = $true
While ($PendingJobs -or $CurrentJobCount) {
    # If a key was pressed during the loop execution, check to see if it was CTRL-C (aka "3"), and if so exit the script after clearing
    #   out any running jobs and setting CTRL-C back to normal.
    If ($Host.UI.RawUI.KeyAvailable -and ($Key = $Host.UI.RawUI.ReadKey("AllowCtrlC,NoEcho,IncludeKeyUp"))) {
        If ([Int]$Key.Character -eq 3) {
            Write-Host ""
            Write-Warning "CTRL-C was used - Shutting down any running jobs before exiting the script."
            Get-Job | Where-Object { $_.Name -like "CRMProductos*" } | Remove-Job -Force -Confirm:$False
            [Console]::TreatControlCAsInput = $False
            Exit
        }
        # Flush the key buffer again for the next loop.
        $Host.UI.RawUI.FlushInputBuffer()
    }
 
    # Perform other work here such as process pending jobs or process out current jobs.
    Start-Sleep 1
}