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

## rslib 配置

详见：[rslib.config.ts](packages/hooks/rslib.config.ts)

> 为了方便对照，产物的父级目录是 `dist-rslib`

- 会输出三份产物

  - dist unpkg umd 格式，对比了下，发现差异有点大，不太确认是正确的生成
  - es，dts 生成
  - lib，无 dts 生成

## tsdown 配置

详见：[tsdown.config.ts](packages/hooks/tsdown.config.ts)

> 为了方便对照，产物的父级目录是 `dist-tsdown`

- 会输出三份产物

  - dist unpkg umd 格式，对比了下，发现差异有点大，不太确认是正确的生成
  - es，dts 生成
  - lib，无 dts
