import { Button, Flex, Spacer, useShiftModifier } from '@invoke-ai/ui-library';
import { useAppSelector } from 'app/store/storeHooks';
import { selectDynamicPromptsIsLoading } from 'features/dynamicPrompts/store/dynamicPromptsSlice';
import { QueueIterationsNumberInput } from 'features/queue/components/QueueIterationsNumberInput';
import { useInvoke } from 'features/queue/hooks/useInvoke';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PiLightningFill, PiSparkleFill } from 'react-icons/pi';

import { InvokeButtonTooltip } from './InvokeButtonTooltip/InvokeButtonTooltip';

export const InvokeButton = memo(() => {
  const { t } = useTranslation();
  const queue = useInvoke();
  const shift = useShiftModifier();
  const isLoadingDynamicPrompts = useAppSelector(selectDynamicPromptsIsLoading);
  const invokeLabel = t('parameters.invoke.invoke');

  return (
    <Flex pos="relative" w="200px">
      <QueueIterationsNumberInput />
      <InvokeButtonTooltip prepend={shift}>
        <Button
          onClick={shift ? queue.enqueueFront : queue.enqueueBack}
          isLoading={queue.isLoading || isLoadingDynamicPrompts}
          loadingText={invokeLabel}
          isDisabled={queue.isDisabled}
          rightIcon={shift ? <PiLightningFill /> : <PiSparkleFill />}
          variant="solid"
          colorScheme="invokeYellow"
          size="lg"
          w="calc(100% - 60px)"
          flexShrink={0}
          justifyContent="space-between"
          spinnerPlacement="end"
        >
          <span>{invokeLabel}</span>
          <Spacer />
        </Button>
      </InvokeButtonTooltip>
    </Flex>
  );
});

InvokeButton.displayName = 'InvokeQueueBackButton';
