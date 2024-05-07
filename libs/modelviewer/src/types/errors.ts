import { IconData, error_outlined, security } from '@equinor/eds-icons';

type ErrorProps = {
  icon: IconData;
  cause?: unknown;
  description?: string;
};

export class CustomError extends Error {
  description: string | undefined;
  icon: IconData;

  constructor(message: string, props: ErrorProps) {
    super(message, { cause: props.cause });
    this.description = props.description;
    this.icon = props.icon;
  }
}

export class AccessError extends CustomError {
  constructor(title: string, cause?: unknown) {
    super(title, {
      icon: security,
      description: 'Request access to Echo in Access IT.',
      cause,
    });
  }
}

export class NoAvailableModelsError extends CustomError {
  constructor() {
    super('No available models.', {
      icon: error_outlined,
      description: 'There are no models available for the given context.',
    });
  }
}
