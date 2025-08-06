# veaba/hooks

原仓库地址：<https://github.com/alibaba/hooks>

> 本项目为 [veaba/hooks](veaba/hooks) fork for [alibaba/hooks](alibaba/hooks)，使用现代流行的构件工具库重构，以获得开发体验，仅限于个人学习项目。

## 在 PS1 中测试结果

rslib `1.9904131 second` :

```powershell
$elapsed = Measure-Command {
    pnpm run rslib
}
Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
```

tsdown `4.5181952 seconds`:

```powershell
$elapsed = Measure-Command {
    pnpm run tsdown
}
Write-Host "pnpm run tsdown: $($elapsed.TotalSeconds) seconds"
```
