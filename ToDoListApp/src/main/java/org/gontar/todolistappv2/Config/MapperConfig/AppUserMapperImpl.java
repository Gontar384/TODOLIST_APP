package org.gontar.todolistappv2.Config.MapperConfig;
import org.gontar.todolistappv2.Model.AppUser;
import org.gontar.todolistappv2.Model.AppUserDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AppUserMapperImpl implements Mapper<AppUser, AppUserDto> {

    private final ModelMapper mapper;

    public AppUserMapperImpl(ModelMapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public AppUserDto mapToDto(AppUser appUser) {
        return mapper.map(appUser, AppUserDto.class);
    }

    @Override
    public AppUser mapToEntity(AppUserDto appUserDto) {
        return mapper.map(appUserDto, AppUser.class);
    }
}
