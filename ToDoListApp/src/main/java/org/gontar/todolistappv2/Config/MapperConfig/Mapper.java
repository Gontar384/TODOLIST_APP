package org.gontar.todolistappv2.Config.MapperConfig;

public interface Mapper <A, B>{
    B mapToDto(A a);
    A mapToEntity(B b);
}
