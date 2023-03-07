@component('mail::message')
{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
@if ($level === 'error')
# @lang('Whoops!')
@else
# @lang('Hello!')
@endif
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<?php
switch ($level) {
    case 'success':
    case 'error':
        $color = $level;
        break;
    default:
        $color = 'primary';
}
?>
@component('mail::button', ['url' => $actionUrl, 'color' => $color])
{{ $actionText }}
@endcomponent
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
Üdvözlettel,<br>
InventorySystem csapata
@endif

{{-- Subcopy --}}
@isset($actionText)
@slot('subcopy')
@lang(
"Ha problémád akad a \":actionText\" gombbal, akkor másold ki és illeszd be az alábbi URL-t\n".
'a böngésződbe:',
[
'actionText' => $actionText,
]
) <span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
@endslot
@endisset
@endcomponent